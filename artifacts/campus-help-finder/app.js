const resources = [
  {
    name: "Campus Food Pantry",
    description: "Pick up free groceries and everyday essentials in a private, welcoming space.",
    keywords: "food pantry groceries meals essentials"
  },
  {
    name: "Student Counseling",
    description: "Talk with a caring counselor about stress, mental health, or whatever is on your mind.",
    keywords: "counseling wellbeing mental health stress therapy"
  },
  {
    name: "Peer Tutoring",
    description: "Get one-on-one study support from trained student tutors across a range of subjects.",
    keywords: "tutoring study academic class subjects"
  },
  {
    name: "Student Legal Aid",
    description: "Get confidential guidance on everyday legal questions from a student-focused team.",
    keywords: "legal aid lawyer advice rights"
  },
  {
    name: "Campus Childcare",
    description: "Find affordable, trusted childcare options and family support for student parents.",
    keywords: "childcare child family daycare parenting"
  },
  {
    name: "Emergency Housing",
    description: "Connect with a safe place to stay and urgent housing support when you need it.",
    keywords: "emergency housing shelter home safe"
  }
];

const searchInput = document.querySelector("#resource-search");
const resourceList = document.querySelector("#resource-list");
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");

function renderResources(query = "") {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const matchingResources = resources.filter((resource) =>
    `${resource.name} ${resource.description} ${resource.keywords}`
      .toLocaleLowerCase()
      .includes(normalizedQuery)
  );

  resourceList.replaceChildren();
  matchingResources.forEach((resource) => {
    const card = document.createElement("article");
    card.className = "resource-card";

    const number = document.createElement("span");
    number.className = "card-number";
    number.setAttribute("aria-hidden", "true");
    number.textContent = String(resources.indexOf(resource) + 1).padStart(2, "0");

    const title = document.createElement("h3");
    title.textContent = resource.name;

    const description = document.createElement("p");
    description.textContent = resource.description;

    const link = document.createElement("a");
    link.className = "learn-more";
    link.href = "#";
    link.setAttribute("aria-label", `Learn more about ${resource.name} (information coming soon)`);
    link.append("Learn more ");
    const arrow = document.createElement("span");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "→";
    link.append(arrow);
    link.addEventListener("click", (event) => event.preventDefault());

    card.append(number, title, description, link);
    resourceList.append(card);
  });

  const count = matchingResources.length;
  resultCount.textContent = normalizedQuery
    ? `Showing ${count} of 6 ${count === 1 ? "resource" : "resources"}`
    : "Showing all 6 resources";
  emptyState.hidden = count !== 0;
  resourceList.hidden = count === 0;
}

searchInput.addEventListener("input", (event) => renderResources(event.currentTarget.value));
renderResources();
