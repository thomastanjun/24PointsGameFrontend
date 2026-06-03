import styled, { css } from 'styled-components';

const panelStyles = css`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-panel);
  box-shadow: var(--shadow-panel);
`;

const buttonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 48px;
  padding: 0 18px;
  border-radius: var(--radius-control);
  border: 1px solid transparent;
  font-size: 0.98rem;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease,
    transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const AppPage = styled.main`
  min-height: 100vh;
  padding: clamp(24px, 4vw, 40px) 16px 40px;
`;

export const PageShell = styled.div`
  width: min(1080px, 100%);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const PageHero = styled.header`
  ${panelStyles};
  padding: clamp(24px, 4vw, 34px);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.96) 0%,
    rgba(245, 248, 255, 0.98) 100%
  );
`;

export const HeroTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 18px;
`;

export const PageEyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent);
`;

export const PageHeadingGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2.1rem, 5vw, 3.3rem);
  line-height: 1.05;
  letter-spacing: -0.04em;
  color: var(--color-text-strong);
`;

export const PageDescription = styled.p`
  max-width: 680px;
  margin: 0;
  font-size: 1rem;
  line-height: 1.65;
  color: var(--color-text-muted);
`;

export const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const MetaPill = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 38px;
  padding: 0 14px;
  border-radius: 999px;
  background: var(--color-accent-soft);
  border: 1px solid #d3defd;
  color: var(--color-accent-strong);
  font-size: 0.92rem;
  font-weight: 600;
`;

export const PageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const PagePanel = styled.section`
  ${panelStyles};
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 24px;
`;

export const PanelHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SectionLabel = styled.span`
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
`;

export const PanelTitle = styled.h2`
  margin: 0;
  font-size: 1.45rem;
  line-height: 1.2;
  color: var(--color-text-strong);
`;

export const PanelDescription = styled.p`
  margin: 0;
  line-height: 1.6;
  color: var(--color-text-muted);
`;

export const PanelActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const SupportingText = styled.p`
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--color-text-muted);
`;

export const PrimaryButton = styled.button`
  ${buttonStyles};
  background: var(--color-accent);
  color: #fff;
  box-shadow: var(--shadow-button);

  &:hover {
    background: var(--color-accent-strong);
  }
`;

export const SecondaryButton = styled.button`
  ${buttonStyles};
  background: var(--color-surface-soft);
  border-color: var(--color-border);
  color: var(--color-text-strong);

  &:hover {
    background: var(--color-surface-strong);
    border-color: var(--color-border-strong);
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 18px;
  border-radius: 18px;
  background: var(--color-surface-soft);
  border: 1px dashed var(--color-border-strong);
`;

export const EmptyStateTitle = styled.h3`
  margin: 0;
  font-size: 1.05rem;
  color: var(--color-text-strong);
`;

export const EmptyStateText = styled.p`
  margin: 0;
  line-height: 1.6;
  color: var(--color-text-muted);
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
`;

export const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text-strong);
`;

export const SubmitButton = styled(PrimaryButton)`
  width: 100%;
`;

export const GameRules = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const RulesTitle = styled.h3`
  margin: 0;
  font-size: 1.05rem;
  color: var(--color-text-strong);
`;

export const RulesList = styled.ul`
  margin: 0;
  padding-left: 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

export const Rule = styled.li`
  color: var(--color-text-muted);
  line-height: 1.55;
`;

const gamePanelStyles = css`
  ${panelStyles};
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.98) 0%,
    rgba(247, 249, 253, 0.99) 100%
  );
`;

export const Container = styled.div`
  width: min(1120px, 100%);
  min-height: 100vh;
  margin: 0 auto;
  padding: clamp(24px, 4vw, 40px) 16px 48px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Header = styled.div`
  ${gamePanelStyles};
  padding: clamp(24px, 4vw, 32px);
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px 16px;
  flex-wrap: wrap;
`;

export const Title = styled.h1`
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.15rem);
  line-height: 1.02;
  letter-spacing: -0.045em;
  color: var(--color-text-strong);
`;

export const TimerWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 16px;
  border-radius: 14px;
  background: var(--color-text-strong);
  color: #fff;
  box-shadow: 0 14px 24px rgba(21, 32, 51, 0.16);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  font-variant-numeric: tabular-nums;
`;

export const RightControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const GameBoard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

export const GameSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FormulaDisplay = styled.div`
  min-height: 88px;
  padding: 18px 20px;
  border-radius: 20px;
  border: 1px solid var(--color-border);
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  font-family: "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono",
    monospace;
  font-size: clamp(1.05rem, 2vw, 1.35rem);
  line-height: 1.5;
  color: var(--color-text-strong);
  word-break: break-word;
  overflow-wrap: anywhere;
`;

export const ResultDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 58px;
  padding: 0 18px;
  border-radius: 16px;
  background: var(--color-accent-soft);
  border: 1px solid #d3defd;
  color: var(--color-accent-strong);
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
  font-variant-numeric: tabular-nums;
`;

export const Input = styled.input`
  width: 100%;
  min-height: 52px;
  padding: 0 16px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-control);
  background: #fff;
  color: var(--color-text-strong);
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder {
    color: #8a96a8;
  }

  &:focus {
    outline: none;
    border-color: #a5b9f3;
    box-shadow: 0 0 0 4px rgba(47, 91, 219, 0.12);
  }
`;


export const WinnerDisplay = styled.div`
  ${gamePanelStyles};
  border-color: #cddfbe;
  background: linear-gradient(180deg, #f8fff5 0%, #f1fbf1 100%);
  padding: clamp(22px, 3vw, 28px);
  text-align: center;
  max-width: 720px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;

  h2 {
      margin: 0;
      font-size: clamp(1.8rem, 3vw, 2.4rem);
      line-height: 1.05;
      color: #22543d;
  }

  p {
      margin: 0;
      line-height: 1.6;
      color: #335848;
  }
`;

export const WinnerFormula = styled.div`
  padding: 16px 18px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid #d7e8d9;
  color: #163322;
  font-size: clamp(1.05rem, 2.4vw, 1.35rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  overflow-wrap: anywhere;
`;

export const PlayerName = styled.div`
  display: inline-flex;
  align-items: center;
  min-height: 42px;
  padding: 0 14px;
  border-radius: 999px;
  background: var(--color-surface-soft);
  border: 1px solid var(--color-border);
  color: var(--color-text-strong);
  font-size: 0.95rem;
  font-weight: 600;
`;

export const GameControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 15px;
  width: 100%;
`;

export const GameAreaSingle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const GameAreaMulti = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(280px, 0.95fr);
  gap: 20px;
  width: 100%;
  align-items: start;

  @media (max-width: 960px) {
      grid-template-columns: 1fr;
  }
`;

const gameBoardPanelStyles = css`
  ${gamePanelStyles};
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: clamp(22px, 3vw, 30px);
`;

export const CurrentPlayerAreaSingle = styled.div`
  ${gameBoardPanelStyles};
  width: min(720px, 100%);
`;

export const CurrentPlayerAreaMulti = styled.div`
  ${gameBoardPanelStyles};
  width: 100%;
`;

export const OtherPlayersArea = styled.div`
  ${gamePanelStyles};
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  padding: clamp(22px, 3vw, 28px);
`;

export const OtherPlayersHeader = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: var(--color-text-strong);
`;


export const PlayerCard = styled.div`
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: 18px;
  padding: 16px;
  box-shadow: 0 12px 22px rgba(21, 32, 51, 0.06);
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const PlayerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text-strong);
`;

export const GameTimer = styled.div`
    display: inline-flex;
    align-items: center;
    min-height: 42px;
    padding: 0 14px;
    border-radius: 999px;
    background: rgba(47, 91, 219, 0.08);
    border: 1px solid #d3defd;
    color: var(--color-accent-strong);
    font-size: 0.92rem;
    font-weight: 700;
    gap: 6px;
    font-variant-numeric: tabular-nums;
`;

export const StatusNotice = styled.div<{ tone?: 'neutral' | 'warning' | 'success' }>`
  padding: 14px 16px;
  border-radius: 16px;
  font-size: 0.95rem;
  line-height: 1.5;
  border: 1px solid
    ${({ tone = 'neutral' }) =>
      tone === 'warning'
        ? '#f1d2a4'
        : tone === 'success'
          ? '#b7d9c6'
          : 'var(--color-border)'};
  background:
    ${({ tone = 'neutral' }) =>
      tone === 'warning'
        ? '#fff7eb'
        : tone === 'success'
          ? '#f0fbf5'
          : 'var(--color-surface-soft)'};
  color:
    ${({ tone = 'neutral' }) =>
      tone === 'warning'
        ? '#9a6700'
        : tone === 'success'
          ? '#24704a'
          : 'var(--color-text-muted)'};
`;

export const PlayerFormulaPreview = styled.div`
  min-height: 58px;
  padding: 12px 14px;
  border-radius: 14px;
  background: var(--color-surface-soft);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  line-height: 1.5;
  overflow-wrap: anywhere;
`;

export const PlayerResultBadge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  background: var(--color-accent-soft);
  border: 1px solid #d3defd;
  color: var(--color-accent-strong);
  font-size: 0.9rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
`;

export const EmptyPlayerState = styled.div`
  padding: 18px;
  border-radius: 16px;
  background: var(--color-surface-soft);
  border: 1px dashed var(--color-border-strong);
  color: var(--color-text-muted);
  line-height: 1.6;
`;

export const CountdownOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 320px;
  border-radius: 24px;
  border: 1px dashed var(--color-border-strong);
  background: linear-gradient(180deg, #ffffff 0%, #f4f7fd 100%);
  font-size: clamp(4rem, 12vw, 6.5rem);
  font-weight: 700;
  color: var(--color-accent);
  animation: pulse 1s infinite;

  @keyframes pulse {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.1); opacity: 0.8; }
      100% { transform: scale(1); opacity: 1; }
  }
`;

export const RevealingNumber = styled.div<{ delay: number, isRevealed: boolean }>`
    animation: ${props => props.isRevealed ? 'flipIn 0.5s ease-out forwards' : 'none'};
    animation-delay: ${props => props.delay}s;
    opacity: ${props => props.isRevealed ? 1 : 0};
    transform: rotateY(90deg);
    
    @keyframes flipIn {
        from { transform: rotateY(90deg); opacity: 0; }
        to { transform: rotateY(0deg); opacity: 1; }
    }
`;
