function runFIFO() {
    const pagesInput = document.getElementById('pages').value;
    const framesInput = document.getElementById('frames').value;

    if (!pagesInput || !framesInput || isNaN(framesInput)) {
        alert("Vui lòng nhập đầy đủ dữ liệu hợp lệ!");
        return;
    }

    const pages = pagesInput.split(',').map(Number);
    const numFrames = parseInt(framesInput);
    if (numFrames <= 0) {
        alert("Số khung phải lớn hơn 0!");
        return;
    }

    const frames = [];
    let pageFaults = 0;
    let output = `
        <style>
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
            th { background-color: #f4f4f4; }
        </style>
        <table>
            <tr>
                <th>Step</th>
                <th>Page</th>
                <th>Frames</th>
                <th>Page Fault</th>
            </tr>`;

    pages.forEach((page, index) => {
        let pageFault = false;

        if (!frames.includes(page)) {
            pageFault = true;
            pageFaults++;

            if (frames.length < numFrames) {
                frames.push(page);
            } else {
                frames.shift();
                frames.push(page);
            }
        }

        output += `
            <tr>
                <td>${index + 1}</td>
                <td>${page}</td>
                <td>${frames.join(', ') || "Empty"}</td>
                <td>${pageFault ? "Yes" : "No"}</td>
            </tr>`;
    });

    output += `</table><p><strong>Total Page Faults:</strong> ${pageFaults}</p>`;
    document.getElementById('output').innerHTML = output;
}
