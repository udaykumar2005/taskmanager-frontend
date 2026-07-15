import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportTasksPDF(tasks) {

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text("Task Manager Report", 14, 20);

    autoTable(doc, {

        startY: 30,

        head: [[

            "Title",
            "Category",
            "Priority",
            "Status",
            "Due Date"

        ]],

        body: tasks.map(task => [

            task.title,

            task.category,

            task.priority,

            task.completed
                ? "Completed"
                : "Pending",

            task.dueDate || "-"

        ])

    });

    doc.save("Tasks.pdf");

}