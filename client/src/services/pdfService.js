import jsPDF from "jspdf";

export const downloadReport = (resume) => {

    const doc = new jsPDF();

    let y = 20;

    doc.setFontSize(20);
    doc.text("AI Resume Analysis Report", 20, y);

    y += 15;

    doc.setFontSize(14);
    doc.text(`Resume: ${resume.fileName}`, 20, y);

    y += 10;

    doc.text(`ATS Score: ${resume.atsScore}`, 20, y);

    const addSection = (title, items) => {

        y += 15;

        doc.setFontSize(16);
        doc.text(title, 20, y);

        y += 8;

        doc.setFontSize(12);

        items.forEach((item) => {

            const lines = doc.splitTextToSize(item, 165);

            doc.text(lines, 25, y);

            y += lines.length * 7 + 3;

            if (y > 270) {

                doc.addPage();

                y = 20;

            }

        });

    };

    addSection("Strengths", resume.strengths);

    addSection("Weaknesses", resume.weaknesses);

    addSection("Missing Skills", resume.missingSkills);

    addSection("Suggestions", resume.suggestions);

    doc.save("Resume_Report.pdf");

};