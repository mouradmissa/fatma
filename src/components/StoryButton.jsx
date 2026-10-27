export default function StoryButton({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  pressed,
  className = "",
  id,
}) {
  return (
    <button
      id={id}
      type="button"
      className={`btn btn-${variant} ${className}`.trim()}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={pressed}
    >
      {children}
    </button>
  );
}
