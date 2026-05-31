import { useState, type ReactNode } from "react";
import { LayoutGrid, Table2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

export type DataTableColumn<T> = {
  key: string;
  label: string;
  align?: "right";
  headerClassName?: string;
  cellClassName?: string;
  hideInRows?: boolean;
  render?: (row: T, index: number) => ReactNode;
  renderHeader?: () => ReactNode;
};

type ViewMode = "columns" | "rows";

function TableViewToggle({ view, onChange }: { view: ViewMode; onChange: (view: ViewMode) => void }) {
  return (
    <div className="inline-flex rounded-lg border border-border/80 bg-background p-0.5 shadow-sm">
      <Button
        type="button"
        variant={view === "columns" ? "secondary" : "ghost"}
        size="sm"
        className="h-8 gap-1.5 rounded-md px-2.5 text-xs font-medium"
        onClick={() => onChange("columns")}
        aria-pressed={view === "columns"}
      >
        <Table2 className="size-3.5" />
        <span className="hidden sm:inline">Table</span>
      </Button>
      <Button
        type="button"
        variant={view === "rows" ? "secondary" : "ghost"}
        size="sm"
        className="h-8 gap-1.5 rounded-md px-2.5 text-xs font-medium"
        onClick={() => onChange("rows")}
        aria-pressed={view === "rows"}
      >
        <LayoutGrid className="size-3.5" />
        <span className="hidden sm:inline">Cards</span>
      </Button>
    </div>
  );
}

function ColumnTable<T>({
  columns,
  rows,
  getRowKey,
  rowClassName,
}: {
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowKey: (row: T, index: number) => string;
  rowClassName?: (row: T, index: number) => string | undefined;
}) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border hover:bg-transparent">
            {columns.map((col) => (
              <TableHead
                key={col.key}
                className={cn(col.align === "right" && "text-right", col.headerClassName)}
              >
                {col.renderHeader ? col.renderHeader() : col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={getRowKey(row, i)} className={cn("group", rowClassName?.(row, i))}>
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  className={cn(
                    col.align === "right" && "text-right tabular-nums",
                    col.key === "actions" && "text-right",
                    col.cellClassName,
                  )}
                >
                  {col.render ? col.render(row, i) : String((row as Record<string, unknown>)[col.key] ?? "")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function RowCards<T>({
  columns,
  rows,
  getRowKey,
  rowClassName,
}: {
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowKey: (row: T, index: number) => string;
  rowClassName?: (row: T, index: number) => string | undefined;
}) {
  const visibleColumns = columns.filter((col) => !col.hideInRows);
  const titleColumn =
    visibleColumns.find((col) => col.label && col.key !== "actions" && col.key !== "select") ??
    visibleColumns[0];
  const footerColumns = visibleColumns.filter((col) => col.key === "actions");
  const bodyColumns = visibleColumns.filter(
    (col) => col !== titleColumn && !footerColumns.includes(col),
  );

  return (
    <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-3">
      {rows.map((row, i) => (
        <div
          key={getRowKey(row, i)}
          className={cn(
            "rounded-lg border border-border/70 bg-card shadow-sm transition-colors hover:border-border hover:bg-muted/20",
            rowClassName?.(row, i),
          )}
        >
          {titleColumn && (
            <div className="border-b border-border/60 px-4 py-3">
              <div className="text-sm font-semibold leading-snug text-foreground">
                {titleColumn.render
                  ? titleColumn.render(row, i)
                  : String((row as Record<string, unknown>)[titleColumn.key] ?? "")}
              </div>
            </div>
          )}
          <dl className={cn("divide-y divide-border/50", titleColumn ? "" : "pt-1")}>
            {bodyColumns.map((col) => (
              <div key={col.key} className="grid grid-cols-[minmax(0,38%)_1fr] items-start gap-3 px-4 py-2.5">
                <dt className="text-xs font-medium text-muted-foreground">{col.label}</dt>
                <dd
                  className={cn(
                    "text-sm text-foreground",
                    col.align === "right" && "text-right tabular-nums",
                  )}
                >
                  {col.render ? col.render(row, i) : String((row as Record<string, unknown>)[col.key] ?? "")}
                </dd>
              </div>
            ))}
          </dl>
          {footerColumns.map((col) => (
            <div key={col.key} className="flex justify-end border-t border-border/60 px-4 py-3">
              {col.render ? col.render(row, i) : String((row as Record<string, unknown>)[col.key] ?? "")}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function TableFooterBar({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <div className="flex items-center justify-between border-t border-border/60 bg-muted/20 px-4 py-2.5 text-xs text-muted-foreground">
      <span>{count} {count === 1 ? "row" : "rows"}</span>
      <span>Showing all results</span>
    </div>
  );
}

type DataTableProps<T> = {
  title?: string;
  recordCount?: number;
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowKey?: (row: T, index: number) => string;
  rowClassName?: (row: T, index: number) => string | undefined;
  headerExtra?: ReactNode;
  className?: string;
  defaultView?: ViewMode;
  emptyState?: ReactNode;
  /** Renders without outer border when nested inside another panel (e.g. users filter card). */
  embedded?: boolean;
};

export function DataTable<T>({
  title,
  recordCount,
  columns,
  rows,
  getRowKey = (_row, i) => String(i),
  rowClassName,
  headerExtra,
  className,
  defaultView = "columns",
  emptyState,
  embedded = false,
}: DataTableProps<T>) {
  const [view, setView] = useState<ViewMode>(defaultView);
  const count = recordCount ?? rows.length;

  const body =
    rows.length === 0 && emptyState ? (
      <div className="flex min-h-[220px] items-center justify-center p-8">{emptyState}</div>
    ) : view === "columns" ? (
      <ColumnTable columns={columns} rows={rows} getRowKey={getRowKey} rowClassName={rowClassName} />
    ) : (
      <RowCards columns={columns} rows={rows} getRowKey={getRowKey} rowClassName={rowClassName} />
    );

  const controls = (
    <div className="flex flex-wrap items-center gap-2">
      <TableViewToggle view={view} onChange={setView} />
      {count > 0 && title && (
        <Badge variant="outline" className="rounded-md px-2 py-0.5 text-xs font-normal text-muted-foreground">
          {count} total
        </Badge>
      )}
      {headerExtra}
    </div>
  );

  if (!title) {
    const shell = embedded
      ? cn(className)
      : cn("overflow-hidden rounded-lg border border-border/70 bg-card shadow-sm", className);

    return (
      <div className={shell}>
        <div className="flex items-center justify-end gap-2 border-b border-border/60 px-4 py-2.5">
          {controls}
        </div>
        {body}
        {rows.length > 0 && view === "columns" && <TableFooterBar count={count} />}
      </div>
    );
  }

  return (
    <Card className={cn("gap-0 overflow-hidden rounded-lg border-border/70 p-0 shadow-sm", className)}>
      <CardHeader className="flex-row flex-wrap items-center justify-between gap-3 space-y-0 border-b border-border/60 bg-card px-4 py-3.5">
        <CardTitle className="text-sm font-semibold tracking-tight">{title}</CardTitle>
        {controls}
      </CardHeader>
      {body}
      {rows.length > 0 && view === "columns" && <TableFooterBar count={count} />}
    </Card>
  );
}

export { TableViewToggle };
