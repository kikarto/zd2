
export type TType = "primary" | "success" | "info" | "warning" | "danger" | "default";

export const getColor = (type: TType = 'default'): string => {
  switch(type) {
    case 'primary':
      return 'var(--color-primary)';
    case 'success':
      return 'var(--color-success)';
    case 'info':
      return 'var(--color-info)';
    case 'warning':
      return 'var(--color-warning)';
    case 'danger':
      return 'var(--color-danger)';
    default:
      return 'var(--color-white)';
  }
};
