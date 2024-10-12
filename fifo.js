function runFIFO() {
    const pages = document.getElementById('pages').value.split(',').map(Number);
    const numFrames = parseInt(document.getElementById('frames').value);
    const frames = [];
    let pageFaults = 0;
    let output = "<table><tr><th>Step</th><th>Page</th><th>Frames</th><th>Page Fault</th></tr>";

    pages.forEach((page, index) => {
        let pageFault = false;

        if (!frames.includes(page)) {
            if (frames.length < numFrames) {
                frames.push(page);
            } else {
                frames.shift();
                frames.push(page);
            }
            pageFault = true;
            pageFaults++;
        }

        output += `<tr><td>${index + 1}</td><td>${page}</td><td>${frames.join(', ')}</td><td>${pageFault ? "Yes" : "No"}</td></tr>`;
    });

    output += `</table><p>Total Page Faults: ${pageFaults}</p>`;
    document.getElementById('output').innerHTML = output;
}