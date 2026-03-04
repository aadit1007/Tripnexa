import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import "../styles/tripresult.css";
import Navbar from "../components/Navbar";

function TripResult() {
  const location = useLocation();
  const data = location.state?.tripData;

  const downloadPDF = () => {
  const pdf = new jsPDF();

  let text = `
  ${data.title}

  Description:
  ${data.description}

  History:
  ${data.history}
  `;

  data.days?.forEach(day => {
    text += `\nDay ${day.day}\n`;
    day.activities.forEach(act => {
      text += `- ${act}\n`;
    });
  });

  pdf.text(JSON.stringify(data, null, 2), 10, 10);
  pdf.save("trip-plan.pdf");
  };

  return (
<>
<Navbar />
<div className="result-wrapper">
    <div className="result-wrapper">

      <div className="hero">
        <img src="https://source.unsplash.com/1600x500/?travel" alt="destination"/>
        <h1>{data?.title || "Trip Plan"}</h1>
      </div>

      <section>
        <h2>Description</h2>
        <p>{data?.description}</p>
      </section>

      <section>
        <h2>History</h2>
        <p>{data?.history}</p>
      </section>

      <section>
        <h2>Itinerary</h2>
        {data?.days?.map(day => (
          <div key={day.day} className="day-card">
            <h3>Day {day.day}</h3>
            <ul>
              {day.activities.map((act,i)=>(
                <li key={i}>{act}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <button onClick={downloadPDF} className="pdf-btn">
        Download PDF
      </button>

    </div>
</div>
</>
  );
}

export default TripResult;