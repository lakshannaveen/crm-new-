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
}) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });
  const isMobile = useMobile();

  // Normalize options to handle both string arrays and object arrays
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === "object" && opt !== null) {
      return {
        value: opt.value,
        label: opt.label || opt.value,
        title: opt.title || opt.label || opt.value,
      };
    }
    return {
      value: opt,
      label: opt,
      title: opt,
    };
  });

  // Find the display label for the current value
  const selectedOption = normalizedOptions.find((opt) => opt.value === value);
  const displayValue = selectedOption?.label || value;
  const displayTitle = selectedOption?.title || displayValue || placeholder;

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

  return (
    <div className="w-full min-w-0 text-xs">
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        type="button"
        disabled={disabled}
        onClick={() => setOpen((p) => !p)}
        className={`w-full min-w-0 flex items-center justify-between
          h-[28px] px-2 py-0 leading-[28px]
          rounded border
          bg-white dark:bg-gray-700
          border-gray-300 dark:border-gray-600
          text-gray-700 dark:text-gray-300 text-xs
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        <span className="truncate leading-[28px]" title={displayTitle}>
          {displayValue || placeholder}
        </span>
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
            ${isMobile ? "max-h-[200px]" : "max-h-40"}
            text-xs
          `}
          style={{
            top: `${pos.top}px`,
            left: `${pos.left}px`,
            width: `${pos.width}px`,
          }}
        >
          {normalizedOptions.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`cursor-pointer px-2 py-1
                hover:bg-gray-100 dark:hover:bg-gray-600
                ${opt.value === value ? "bg-gray-100 dark:bg-gray-600" : ""}
              `}
              title={opt.title}
            >
              <span className="block truncate">{opt.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
