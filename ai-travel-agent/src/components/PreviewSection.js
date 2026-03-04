import "../styles/landing.css";
import preview from "../assets/hero-preview.png";

function PreviewSection() {
  return (
    <section className="preview">
      <img src={preview} alt="Trip Preview" />
    </section>
  );
}

export default PreviewSection;