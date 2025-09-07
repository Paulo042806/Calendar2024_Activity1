const holidays = {
  "2024-01-01": { title: "New Year's Day", desc: "Celebration of the first day of the year.", img: "https://upload.wikimedia.org/wikipedia/commons/0/0d/New_Year_Fireworks_over_HKL_Skyline_2011.jpg" },
  "2024-03-28": { title: "Maundy Thursday", desc: "Commemoration of the Last Supper of Jesus Christ.", img: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Last_Supper_-_Leonardo_Da_Vinci_-_High_Resolution_32x16.jpg" },
  "2024-03-29": { title: "Good Friday", desc: "Commemoration of the crucifixion of Jesus Christ.", img: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Crucifixion_Masaccio.jpg" },
  "2024-04-09": { title: "Araw ng Kagitingan", desc: "Day of Valor honoring Filipino soldiers of WWII.", img: "https://upload.wikimedia.org/wikipedia/commons/5/58/Mt_Samat_Cross.jpg" },
  "2024-05-01": { title: "Labor Day", desc: "Celebration of workers and the labor movement.", img: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Workers_Day_Demonstration.jpg" },
  "2024-06-12": { title: "Independence Day", desc: "Commemoration of Philippine Independence (1898).", img: "https://upload.wikimedia.org/wikipedia/commons/8/87/Philippine_flag_Independence_Day.jpg" },
  "2024-08-26": { title: "National Heroes Day", desc: "Honoring Philippine national heroes.", img: "https://upload.wikimedia.org/wikipedia/commons/7/73/Bonifacio_Monumentjf9718_01.JPG" },
  "2024-11-30": { title: "Bonifacio Day", desc: "Birthday of Andres Bonifacio, revolutionary leader.", img: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Bonifacio_Day.jpg" },
  "2024-12-25": { title: "Christmas Day", desc: "Celebration of the birth of Jesus Christ.", img: "https://upload.wikimedia.org/wikipedia/commons/0/08/Christmas_Tree_Star.jpg" },
  "2024-12-30": { title: "Rizal Day", desc: "Commemoration of the martyrdom of Dr. Jose Rizal.", img: "https://upload.wikimedia.org/wikipedia/commons/1/14/Rizal_Monument_Luneta.jpg" }
};

function generateCalendar(year) {
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const container = document.getElementById("calendar-container");

  for (let m = 0; m < 12; m++) {
    const monthDiv = document.createElement("div");
    monthDiv.classList.add("month");
    const h2 = document.createElement("h2");
    h2.textContent = months[m] + " " + year;
    monthDiv.appendChild(h2);

    const calendar = document.createElement("div");
    calendar.classList.add("calendar");

    calendar.appendChild(document.createElement("div")); // blank for weeknum column
    ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].forEach(d => {
      const head = document.createElement("div");
      head.classList.add("header");
      head.textContent = d;
      calendar.appendChild(head);
    });

    const firstDay = new Date(year, m, 1).getDay();
    const daysInMonth = new Date(year, m+1, 0).getDate();

    let dayCounter = 1;
    let week = getWeekNumber(new Date(year, m, 1));

    for (let row = 0; dayCounter <= daysInMonth; row++) {
      const weekDiv = document.createElement("div");
      weekDiv.classList.add("weeknum");
      weekDiv.textContent = "W" + week;
      calendar.appendChild(weekDiv);

      for (let col = 0; col < 7; col++) {
        if ((row === 0 && col < firstDay) || dayCounter > daysInMonth) {
          calendar.appendChild(document.createElement("div"));
        } else {
          const dayDiv = document.createElement("div");
          dayDiv.classList.add("day");
          dayDiv.textContent = dayCounter;
          const dateStr = `${year}-${String(m+1).padStart(2,'0')}-${String(dayCounter).padStart(2,'0')}`;

          if (holidays[dateStr]) {
            dayDiv.classList.add("holiday");
            dayDiv.onclick = () => openModal(dateStr);
          }

          calendar.appendChild(dayDiv);
          dayCounter++;
        }
      }
      week++;
    }
    monthDiv.appendChild(calendar);
    container.appendChild(monthDiv);
  }
}

function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1)/7);
  return weekNo;
}

function openModal(dateStr) {
  const holiday = holidays[dateStr];
  document.getElementById("holiday-title").textContent = holiday.title;
  document.getElementById("holiday-desc").textContent = holiday.desc;
  document.getElementById("holiday-img").src = holiday.img;
  document.getElementById("holiday-info").style.display = "flex";
}
function closeModal() {
  document.getElementById("holiday-info").style.display = "none";
}

generateCalendar(2024);