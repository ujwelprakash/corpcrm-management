import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import type { SortingState } from "@tanstack/react-table";
import { useState } from "react";

type Props<T> = {
  data: T[];
  columns: any;
  title?: string;
  subtitle?: string;
};

function TableWrapper<T>({ data, columns, title, subtitle }: Props<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pageSize, setPageSize] = useState(10);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { sorting },
    onSortingChange: setSorting,
    initialState: { pagination: { pageSize } },
  });
  const { pageIndex } = table.getState().pagination;
  const totalPages = table.getPageCount();
  const totalRows = data.length;
  const startRow = pageIndex * pageSize + 1;
  const endRow = Math.min((pageIndex + 1) * pageSize, totalRows);

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)]"
      style={{
        background: `rgb(var(--color-surface))`,
        border: `1px solid rgb(var(--color-border-soft))`,
      }}
    >
      {/* ── Table Header ── */}
      {(title || subtitle) && (
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: `1px solid rgb(var(--color-border-soft))` }}
        >
          <div>
            {title && (
              <h2
                className="text-[15px] font-bold tracking-tight"
                style={{ color: `rgb(var(--color-text))` }}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className="text-[12px] mt-0.5"
                style={{ color: `rgb(var(--color-text-muted))` }}
              >
                {subtitle}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative hidden sm:block">
              <svg
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
                style={{ color: `rgb(var(--color-text-muted))` }}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                className="rounded-xl pl-8 pr-3 py-1.5 text-[12px] outline-none transition-all w-40
                  bg-[rgb(var(--color-bg-soft))]
                  border border-[rgb(var(--color-border))]
                  text-[rgb(var(--color-text-soft))]
                  placeholder:text-[rgb(var(--color-text-muted))]
                  focus:border-[rgb(var(--accent))]
                  focus:ring-2 focus:ring-[rgb(var(--accent)/0.12)]"
              />
            </div>
            {/* Export button */}
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-medium transition-all"
              style={{
                color: `rgb(var(--color-text-soft))`,
                border: `1px solid rgb(var(--color-border))`,
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = `rgb(var(--color-bg-soft))`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export
            </button>
          </div>
        </div>
      )}

      {/* ── Table ── */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ background: `rgb(var(--color-bg-soft))`, borderBottom: `1px solid rgb(var(--color-border-soft))` }}>
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-5 py-3 text-left text-[11.5px] font-semibold uppercase tracking-wider whitespace-nowrap transition-colors"
                    style={{
                      color: header.column.getCanSort()
                        ? header.column.getIsSorted()
                          ? `rgb(var(--accent))`
                          : `rgb(var(--color-text-muted))`
                        : `rgb(var(--color-text-muted))`,
                      cursor: header.column.getCanSort() ? "pointer" : "default",
                    }}
                  >
                    <span className="flex items-center gap-1.5">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <span className="flex flex-col gap-[2px]">
                          <svg
                            className="w-2.5 h-2.5 transition-colors"
                            style={{
                              color: header.column.getIsSorted() === "asc"
                                ? `rgb(var(--accent))`
                                : `rgb(var(--color-border))`,
                            }}
                            fill="currentColor" viewBox="0 0 20 20"
                          >
                            <path d="M5 12l5-5 5 5H5z" />
                          </svg>
                          <svg
                            className="w-2.5 h-2.5 transition-colors"
                            style={{
                              color: header.column.getIsSorted() === "desc"
                                ? `rgb(var(--accent))`
                                : `rgb(var(--color-border))`,
                            }}
                            fill="currentColor" viewBox="0 0 20 20"
                          >
                            <path d="M15 8l-5 5-5-5h10z" />
                          </svg>
                        </span>
                      )}
                    </span>
                  </th>
                ))
              )}
            </tr>
          </thead>

          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ background: `rgb(var(--color-bg-muted))` }}
                    >
                      <svg
                        className="w-6 h-6"
                        style={{ color: `rgb(var(--color-text-muted))` }}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold" style={{ color: `rgb(var(--color-text-soft))` }}>
                        No data found
                      </p>
                      <p className="text-[12px] mt-0.5" style={{ color: `rgb(var(--color-text-muted))` }}>
                        There are no records to display
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  className="transition-colors duration-100 table-row-hover"
                  style={{
                    background: i % 2 === 0
                      ? `rgb(var(--color-surface))`
                      : `rgb(var(--color-bg-soft))`,
                    borderBottom: `1px solid rgb(var(--color-border-soft))`,
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-5 py-3 text-[13px] whitespace-nowrap"
                      style={{ color: `rgb(var(--color-text-soft))` }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ── */}
      {totalRows > 0 && (
        <div
          className="flex items-center justify-between px-5 py-3.5 flex-wrap gap-3"
          style={{
            borderTop: `1px solid rgb(var(--color-border-soft))`,
            background: `rgb(var(--color-bg-soft))`,
          }}
        >
          {/* Row count + page size */}
          <div className="flex items-center gap-3">
            <p className="text-[12px]" style={{ color: `rgb(var(--color-text-muted))` }}>
              Showing{" "}
              <span className="font-semibold" style={{ color: `rgb(var(--color-text))` }}>
                {startRow}–{endRow}
              </span>{" "}
              of{" "}
              <span className="font-semibold" style={{ color: `rgb(var(--color-text))` }}>
                {totalRows}
              </span>{" "}
              results
            </p>
            <select
              value={pageSize}
              onChange={(e) => {
                const val = Number(e.target.value);
                setPageSize(val);
                table.setPageSize(val);}}
              className="text-[12px] rounded-lg px-2 py-1 outline-none transition-all cursor-pointer"
              style={{color: `rgb(var(--color-text-soft))`,
                background: `rgb(var(--color-surface))`,
                border: `1px solid rgb(var(--color-border))`,}}>
              {[5, 10, 20, 50].map((n) => (
                <option key={n} value={n}>{n}page</option>
              ))}
            </select>
          </div>

          {/* Page buttons */}
          <div className="flex items-center gap-1">
            <PaginationBtn onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} title="First">«</PaginationBtn>
            <PaginationBtn onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} title="Previous">‹</PaginationBtn>

            {Array.from({ length: totalPages }, (_, i) => i)
              .filter((i) => Math.abs(i - pageIndex) <= 2)
              .map((i) => (
                <button
                  key={i}
                  onClick={() => table.setPageIndex(i)}
                  className="w-8 h-8 rounded-lg text-[12.5px] font-medium transition-all"
                  style={
                    i === pageIndex
                      ? {
                          background: `rgb(var(--accent))`,
                          color: "#ffffff",
                          boxShadow: `0 1px 4px rgb(var(--accent) / 0.3)`,
                        }
                      : {
                          color: `rgb(var(--color-text-soft))`,
                          background: "transparent",
                        }
                  }
                >
                  {i + 1}
                </button>
              ))}

            <PaginationBtn onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} title="Next">›</PaginationBtn>
            <PaginationBtn onClick={() => table.setPageIndex(totalPages - 1)} disabled={!table.getCanNextPage()} title="Last">»</PaginationBtn>
          </div>
        </div>
      )}

      <style>{`
        .table-row-hover:hover {
          background: rgb(var(--accent-light)) !important;
        }
      `}</style>
    </div>
  );
}

function PaginationBtn({
  onClick,
  disabled,
  children,
  title,
}: {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="w-8 h-8 rounded-lg text-[14px] font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      style={{ color: `rgb(var(--color-text-muted))` }}
    >
      {children}
    </button>
  );
}

export default TableWrapper;