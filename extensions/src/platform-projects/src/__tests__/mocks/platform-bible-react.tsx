/**
 * Lightweight mock of platform-bible-react components for unit testing.
 *
 * Each component renders minimal HTML that preserves the semantic structure needed for test
 * assertions (text content, disabled state, event handlers, etc.)
 */
import React from 'react';

// ---- Basic form components ----

export function Button({
  children,
  disabled,
  onClick,
  variant,
  type,
  ...rest
}: {
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  variant?: string;
  type?: string;
  [key: string]: unknown;
}) {
  return (
    <button type="button" disabled={disabled} onClick={onClick} data-variant={variant} {...rest}>
      {children}
    </button>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} />;
}

export function Label({
  children,
  htmlFor,
  ...rest
}: {
  children?: React.ReactNode;
  htmlFor?: string;
  [key: string]: unknown;
}) {
  return (
    <label htmlFor={htmlFor} {...rest}>
      {children}
    </label>
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} />;
}

export function Spinner() {
  return <span data-testid="spinner">Loading...</span>;
}

// ---- Checkbox ----

export function Checkbox({
  id,
  checked,
  onCheckedChange,
  'aria-label': ariaLabel,
}: {
  id?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean | 'indeterminate') => void;
  'aria-label'?: string;
}) {
  return (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
      aria-label={ariaLabel}
    />
  );
}

// ---- ComboBox ----

export function ComboBox({
  id,
  options,
  value,
  onChange,
  buttonPlaceholder,
  ariaLabel,
  isDisabled,
}: {
  id?: string;
  options?: Array<{ label: string }>;
  value?: { label: string };
  onChange?: (value: { label: string }) => void;
  buttonPlaceholder?: string;
  ariaLabel?: string;
  isDisabled?: boolean;
}) {
  return (
    <select
      id={id}
      aria-label={ariaLabel}
      disabled={isDisabled}
      value={value?.label ?? ''}
      onChange={(e) => {
        const opt = options?.find((o) => o.label === e.target.value);
        if (opt && onChange) onChange(opt);
      }}
    >
      {!value && <option value="">{buttonPlaceholder}</option>}
      {options?.map((opt) => (
        <option key={opt.label} value={opt.label}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

// ---- Select components ----

const SelectContext = React.createContext<{
  value?: string;
  onValueChange?: (val: string) => void;
}>({});

export function Select({
  children,
  value,
  onValueChange,
  defaultValue,
}: {
  children?: React.ReactNode;
  value?: string;
  onValueChange?: (val: string) => void;
  defaultValue?: string;
}) {
  return (
    <SelectContext.Provider value={{ value: value ?? defaultValue, onValueChange }}>
      <div data-testid="select">{children}</div>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({ children }: { children?: React.ReactNode }) {
  return <div data-testid="select-trigger">{children}</div>;
}

export function SelectValue() {
  const { value } = React.useContext(SelectContext);
  return <span>{value}</span>;
}

export function SelectContent({ children }: { children?: React.ReactNode }) {
  return <div>{children}</div>;
}

export function SelectItem({ children, value }: { children?: React.ReactNode; value: string }) {
  const { onValueChange } = React.useContext(SelectContext);
  return (
    <div role="option" onClick={() => onValueChange?.(value)}>
      {children}
    </div>
  );
}

// ---- Tabs ----

const TabsContext = React.createContext<{
  activeTab: string;
  setActiveTab: (tab: string) => void;
}>({ activeTab: '', setActiveTab: () => {} });

export function Tabs({
  children,
  value,
  onValueChange,
  defaultValue,
}: {
  children?: React.ReactNode;
  value?: string;
  onValueChange?: (val: string) => void;
  defaultValue?: string;
}) {
  const [activeTab, setActiveTab] = React.useState(value ?? defaultValue ?? '');

  React.useEffect(() => {
    if (value !== undefined) setActiveTab(value);
  }, [value]);

  const handleSetActiveTab = React.useCallback(
    (tab: string) => {
      setActiveTab(tab);
      onValueChange?.(tab);
    },
    [onValueChange],
  );

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleSetActiveTab }}>
      <div data-testid="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children }: { children?: React.ReactNode }) {
  return <div role="tablist">{children}</div>;
}

export function TabsTrigger({
  children,
  value,
  disabled,
}: {
  children?: React.ReactNode;
  value: string;
  disabled?: boolean;
}) {
  const { activeTab, setActiveTab } = React.useContext(TabsContext);
  return (
    <button
      type="button"
      role="tab"
      aria-selected={activeTab === value}
      disabled={disabled}
      onClick={() => !disabled && setActiveTab(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children, value }: { children?: React.ReactNode; value: string }) {
  const { activeTab } = React.useContext(TabsContext);
  if (activeTab !== value) return null;
  return <div role="tabpanel">{children}</div>;
}

// ---- Tooltip ----

export function TooltipProvider({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}

export function Tooltip({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}

export function TooltipTrigger({
  children,
  asChild,
}: {
  children?: React.ReactNode;
  asChild?: boolean;
}) {
  return <>{children}</>;
}

export function TooltipContent({ children }: { children?: React.ReactNode }) {
  return <span className="tooltip-content">{children}</span>;
}
