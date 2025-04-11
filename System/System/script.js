const prices = {
  "شعر ودقن": 120,
  "حلاقة شعر": 60,
  "دقن": 60,
  "قص أطفال (ولاد)": 50,
  "قص أطفال (بنات)": 80,
  "استشوار شعر": 60,
  "مكوى بيبي ليس": 60,
  "توبيك تكثيف": 20,
  "صبغة شعر أسود": 110,
  "رش ألوان": 15,
  "شمع أو فتلة": 20,
  "تنظيف بشرة": 0
};

const checkboxes = document.querySelectorAll(".services input[type='checkbox']");
const faceCleanCheck = document.getElementById("faceCleanCheck");
const customPriceInput = document.getElementById("customPrice");
const totalElement = document.getElementById("total");

checkboxes.forEach(box => box.addEventListener("change", updateTotal));
customPriceInput.addEventListener("input", updateTotal);

faceCleanCheck.addEventListener("change", () => {
  customPriceInput.style.display = faceCleanCheck.checked ? "block" : "none";
  updateTotal();
});

function updateTotal() {
  let total = 0;
  checkboxes.forEach(box => {
    if (box.checked) {
      const serviceName = box.value;
      const servicePrice = serviceName === "تنظيف بشرة"
        ? Number(customPriceInput.value || 0)
        : prices[serviceName];
      total += servicePrice;
    }
  });
  totalElement.textContent = total;
}

function saveRecord() {
  const employee = document.getElementById("employee").value.trim();
  if (!employee) return alert("اكتب اسم الموظف");

  const selectedServices = Array.from(checkboxes)
    .filter(box => box.checked)
    .map(box => box.value);

  if (selectedServices.length === 0) return alert("اختر خدمة واحدة على الأقل");

  const inputDate = document.getElementById("manualDate").value;
  const serviceDate = inputDate ? new Date(inputDate) : new Date();

  const record = {
    employee,
    services: selectedServices,
    total: totalElement.textContent,
    time: serviceDate.toISOString()
  };

  fetch('http://localhost:5000/api/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(record)
  })
  .then(response => response.json())
  .then(() => alert("تم حفظ الخدمة بنجاح"))
  .catch(error => {
    alert("حدث خطأ أثناء حفظ الخدمة");
    console.error(error);
  });
}

function printInvoice() {
  const employee = document.getElementById("employee").value.trim();
  const selectedServices = Array.from(checkboxes)
    .filter(box => box.checked)
    .map(box => box.value);

  const total = totalElement.textContent;

  const win = window.open('', '', 'width=400,height=600');
  win.document.write(`<h2 style="text-align:center;">MR.HANY 💈</h2>`);
  win.document.write(`<p><strong>الموظف:</strong> ${employee}</p>`);
  win.document.write(`<p><strong>الخدمات:</strong> ${selectedServices.join(", ")}</p>`);
  win.document.write(`<p><strong>الإجمالي:</strong> ${total} جنيه</p>`);
  win.document.write(`<p><strong>الوقت:</strong> ${new Date().toLocaleString()}</p>`);
  win.print();
  win.close();
}

function showReportRange() {
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;

  if (!startDate || !endDate) return alert("اختر تاريخ البداية والنهاية");

  fetch(`http://localhost:5000/api/logs?start=${startDate}&end=${endDate}`)
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
        alert("مفيش بيانات للفترة دي");
        return;
      }

      const reportHTML = data.map(record => `
        <div style="border:1px solid #ccc; padding:10px; margin-bottom:10px;">
          <h3>الموظف: ${record.employee}</h3>
          <p>الخدمات: ${record.services.join(", ")}</p>
          <p>الإجمالي: ${record.total} جنيه</p>
          <p>التاريخ: ${new Date(record.time).toLocaleString()}</p>
        </div>
      `).join('');

      document.getElementById("reportArea").innerHTML = reportHTML;
    })
    .catch(error => {
      alert("حدث خطأ أثناء تحميل البيانات");
      console.error(error);
    });
}
