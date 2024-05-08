export const bugsData = [
  {
    _id: "vzZl2H",
    createdAt: 1713626844493,
    title: "UI Alignment Issue on Profile Page",
    severity: 1,
    description:
      "The profile picture appears misaligned on smaller screen sizes.",
    labels: ["UI", "design", "alignment", "low severity"],
  },
  {
    _id: "ouNhdF",
    createdAt: 1713632016997,
    title: "Spelling Mistake in Error Message",
    severity: 2,
    description:
      "There is a typographical error in the error message displayed during login.",
    labels: ["UI", "text", "error message", "low severity"],
  },
  {
    _id: "hCnd1V",
    createdAt: 1713688871319,
    title: "Inactive Button on Settings Page",
    severity: 2,
    description:
      "The 'Save Changes' button remains inactive even after making modifications in the settings.",
    labels: ["UI", "interaction", "button", "low severity"],
  },
  {
    _id: "0MFLpQ",
    createdAt: 1713688886417,
    title: "Incorrect Tooltip Displayed on Hover",
    severity: 3,
    description:
      "The tooltip displayed on hovering over an icon does not match its functionality.",
    labels: ["UI", "tooltip", "interaction", "low severity"],
  },
  {
    _id: "ilvaIM",
    createdAt: 1714833127882,
    title: "Broken Link in Help Section",
    severity: 2,
    description:
      "One of the links in the help section redirects to a non-existent page.",
    labels: ["UI", "help", "link", "low severity"],
  },
  {
    _id: "vzZl5H",
    createdAt: 1713626844493,
    title: "Cross-Site Scripting (XSS) Vulnerability in Forum",
    severity: 5,
    description:
      "An attacker can inject malicious scripts into the forum pages, leading to potential data theft or manipulation of user sessions.",
    labels: ["security", "web application", "XSS", "vulnerability"],
  },
  {
    _id: "ouNhdG",
    createdAt: 1713632016997,
    title: "Buffer Overflow in Network Service",
    severity: 6,
    description:
      "This bug enables attackers to overwrite adjacent memory locations, potentially leading to system crashes or remote code execution.",
    labels: ["security", "networking", "buffer overflow", "vulnerability"],
  },
  {
    _id: "hCnd1W",
    createdAt: 1713688871319,
    title: "SQL Injection Vulnerability in E-commerce Platform",
    severity: 7,
    description:
      "Attackers can manipulate SQL queries to access, modify, or delete sensitive data stored in the database, compromising user privacy and integrity.",
    labels: ["security", "SQL injection", "vulnerability", "e-commerce"],
  },
  {
    _id: "0MFLpR",
    createdAt: 1713688886417,
    title: "Denial-of-Service (DoS) Vulnerability in DNS Server",
    severity: 6,
    description:
      "This bug allows attackers to flood the DNS server with requests, rendering it unable to respond to legitimate queries and disrupting network services.",
    labels: ["security", "networking", "DoS", "vulnerability"],
  },
  {
    _id: "ilvaIN",
    createdAt: 1714833127882,
    title: "Privilege Escalation Vulnerability in Operating System",
    severity: 7,
    description:
      "An attacker with limited access can exploit this bug to gain elevated privileges, potentially gaining full control over the system.",
    labels: [
      "security",
      "operating system",
      "privilege escalation",
      "vulnerability",
    ],
  },
]
