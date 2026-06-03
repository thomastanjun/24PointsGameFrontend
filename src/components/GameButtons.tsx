import styled, { css } from 'styled-components';

const tileButtonStyles = css`
  border: 1px solid var(--color-border);
  border-radius: 18px;
  transition: transform 0.18s ease, box-shadow 0.18s ease,
    border-color 0.18s ease, background-color 0.18s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  &:disabled {
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`;

const controlButtonStyles = css`
  min-height: 52px;
  padding: 0 18px;
  border-radius: var(--radius-control);
  border: 1px solid var(--color-border);
  font-size: 0.98rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease,
    background-color 0.18s ease, border-color 0.18s ease, color 0.18s ease;

  &:hover {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const NumberButton = styled.button`
  ${tileButtonStyles};
  width: 100%;
  aspect-ratio: 1;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  box-shadow: 0 14px 24px rgba(21, 32, 51, 0.08);
  color: var(--color-text-strong);
  font-size: clamp(2rem, 5vw, 2.75rem);
  font-weight: 700;
  letter-spacing: -0.04em;

  &:hover:not(:disabled) {
    border-color: #b5c0d2;
    box-shadow: 0 18px 28px rgba(21, 32, 51, 0.12);
  }

  &:disabled {
    background: #e8edf4;
    border-color: #d0d8e4;
    color: #91a0b4;
  }
`;

export const OperatorButton = styled.button`
  ${tileButtonStyles};
  width: 100%;
  min-height: 64px;
  background: linear-gradient(180deg, #536273 0%, #435161 100%);
  box-shadow: 0 12px 22px rgba(31, 41, 55, 0.18);
  color: #fff;
  font-size: 1.4rem;
  font-weight: 700;

  &:hover:not(:disabled) {
    border-color: #435161;
    background: linear-gradient(180deg, #4b596a 0%, #394654 100%);
  }
`;

export const ControlButton = styled.button`
  ${controlButtonStyles};
  background: var(--color-surface);
  color: var(--color-text-strong);
  box-shadow: 0 10px 18px rgba(21, 32, 51, 0.06);

  &:hover {
    background: var(--color-surface-soft);
    border-color: var(--color-border-strong);
  }
`;

export const PrimaryControlButton = styled(ControlButton)`
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: #fff;
  box-shadow: var(--shadow-button);

  &:hover {
    background: var(--color-accent-strong);
    border-color: var(--color-accent-strong);
  }
`;

export const QuitButton = styled(ControlButton)`
  background: #fff4f5;
  border-color: #e9c1c6;
  color: #a23343;

  &:hover {
    background: #ffecef;
    border-color: #dfb0b7;
  }
`;

export const NumbersGrid = styled.div`
  width: 100%;
  max-width: 264px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
`;

export const OperatorGrid = styled.div`
  width: 100%;
  max-width: 336px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
`;

export const ButtonGroup = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;
