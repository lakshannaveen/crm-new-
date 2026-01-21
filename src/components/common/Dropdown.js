import { useEffect, useRef, useState } from "react";
import useMobile from "../../hooks/useMobile";

/* Arrow Icon */
const ArrowIcon = ({ open }) => (
  <svg
    className={`w-3 h-3 ml-2 transition-transform duration-200 ${
      open ? "rotate-180" : ""
    }`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
      clipRule="evenodd"
    />
  </svg>
);

export default function CustomDropdown({
  value,
  options = [],
  onChange,
  disabled = false,
  placeholder = "Select...",
  openDownward = false,
  size = "small",
  searchable = false,
  searchPlaceholder = "Search...",
}) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });
  const isMobile = useMobile();
  const [searchTerm, setSearchTerm] = useState("");

  const sizeClasses = {
    small: {
      button: "h-[28px] px-2 py-0 leading-[28px] text-xs",
      list: `${isMobile ? "max-h-[200px]" : "max-h-40"} text-xs`,
    },
    large: {
      button: "h-10 px-4 py-2 leading-10 text-sm",
      list: `${isMobile ? "max-h-[300px]" : "max-h-64"} text-sm`,
    },
  };

  const currentSize = sizeClasses[size] || sizeClasses.small;

  const computePosition = () => {
    const btn = buttonRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    // Default: open below the button
    let top = rect.bottom;

    // If not forced to open downward, compute if we need to flip up when space is limited
    if (!openDownward) {
      const dropdownMaxHeight = isMobile ? 200 : 160;
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      if (spaceBelow < dropdownMaxHeight && spaceAbove > spaceBelow) {
        top = Math.max(8, rect.top - Math.min(dropdownMaxHeight, spaceAbove));
      }
    }

    setPos({
      top,
      left: rect.left,
      width: rect.width,
    });
  };

  useEffect(() => {
    if (!open) return;
    computePosition();

    const onScroll = () => computePosition();
    const onResize = () => computePosition();

    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
    };
  }, [open, isMobile]);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (
        buttonRef.current?.contains(e.target) ||
        dropdownRef.current?.contains(e.target)
      )
        return;
      setOpen(false);
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    if (!open) setSearchTerm("");
  }, [open]);

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredOptions =
    searchable && normalizedSearch
      ? options.filter((opt) =>
          String(opt).toLowerCase().includes(normalizedSearch),
        )
      : options;

  return (
    <div className="w-full text-xs">
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        type="button"
        disabled={disabled}
        onClick={() => setOpen((p) => !p)}
        className={`w-full flex items-center justify-between
          rounded border
          bg-white dark:bg-gray-700
          border-gray-300 dark:border-gray-600
          text-gray-700 dark:text-gray-300
          ${currentSize.button}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        <span className="truncate">{value || placeholder}</span>
        <ArrowIcon open={open} />
      </button>

      {/* Dropdown List */}
      {open && !disabled && (
        <ul
          ref={dropdownRef}
          className={`fixed z-[9999] overflow-y-auto
            rounded border shadow
            bg-white dark:bg-gray-700
            border-gray-300 dark:border-gray-600
            ${currentSize.list}
          `}
          style={{
            top: `${pos.top}px`,
            left: `${pos.left}px`,
            width: `${pos.width}px`,
          }}
        >
          {searchable && (
            <li className="sticky top-0 bg-white dark:bg-gray-700 p-2 border-b border-gray-200 dark:border-gray-600">
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="flex-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1 text-xs text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="px-2 py-1 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 rounded text-xs font-medium transition-colors"
                    title="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
            </li>
          )}
          {filteredOptions.length === 0 ? (
            <li className="px-3 py-2 text-xs text-gray-500 dark:text-gray-300">
              No results
            </li>
          ) : (
            filteredOptions.map((opt) => (
              <li
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`cursor-pointer px-3 py-2
                  hover:bg-gray-100 dark:hover:bg-gray-600
                  ${opt === value ? "bg-gray-100 dark:bg-gray-600" : ""}
                `}
              >
                {opt}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
