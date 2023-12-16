import './LoadingOverlay.css'
import ReactDOM from "react-dom";

export interface ILoadingOverlayProps {
  isVisible: boolean;
}

export const LoadingOverlay: React.FC<ILoadingOverlayProps> = ({ isVisible }) => {
  const loadingOverlayElement = document.getElementById("loading-overlay");
  if (!loadingOverlayElement) {
    return null;
  }
  return ReactDOM.createPortal(isVisible
    ? (
      <div className="loader-overlay">
        <span className="loader" />
      </div>
    )
    : null, loadingOverlayElement);
};