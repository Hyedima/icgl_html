import { FileCheck2, Layers, PieChart, GraduationCap } from 'lucide-react'
import abubakarJimoh from '../assets/people/abubakar-jimoh.png'
import tonyOkpanachi from '../assets/people/tony-okpanachi.png'
import chiomaSideso from '../assets/people/chioma-sideso.png'
import baqiSalihu from '../assets/people/baqi-salihu.png'
import anthonyAsonye from '../assets/people/anthony-asonye.png'
import zainabAliyu from '../assets/people/zainab-aliyu.png'
import adedamolaAdedotun from '../assets/people/adedamola-adedotun.png'
import chiomaKemaOgwo from '../assets/people/chioma-kema-ogwo.png'
import cletusEbe from '../assets/people/cletus-ebe.png'
import newsChartsPhoto from '../assets/who-we-are-web.jpg'
import newsHandshakePhoto from '../assets/hero-2-web.jpg'
import newsMsmePhoto from '../assets/kvp-img-web.jpg'
import newsTeamPhoto from '../assets/career-team-web.jpg'
import ratingsIso1 from '../assets/ratings-iso1.png'
import ratingsIso2 from '../assets/ratings-iso2.png'
import ratingsIso3 from '../assets/ratings-iso3.png'
import ratingsAgu from '../assets/ratings-agu.png'

export const NAV = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Impact', to: '/impact' },
  {
    label: 'Resources',
    children: [
      { label: 'News', to: '/resources/news' },
      { label: 'FAQs', to: '/resources/faqs' },
      { label: 'Publications', to: '/resources/publications' },
      { label: 'Privacy Policy', to: '/resources/privacy-policy' },
      { label: 'Policies', to: '/resources/policies' },
      { label: 'Whistleblowing', to: '/resources/whistleblowing' },
      { label: 'Ratings', to: '/resources/ratings' },
    ],
  },
  { label: 'Career', to: '/career' },
  { label: 'Contact', to: '/contact' },
]

export const CONTACT = {
  address: 'Plot 952/953 Idejo Street, Victoria Island, Lagos',
  phone: '+234 201 906 1000',
  phoneHref: 'tel:+2342019061000',
  email: 'info@impactguaranteeng.com',
}

// TODO: replace '#' with ICGL's real social profile URLs.
export const SOCIALS = [
  { label: 'Facebook', href: '#' },
  { label: 'X', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
]

export const CERTIFICATIONS = [
  {
    code: 'ISO 27001:2022',
    name: 'Information Security Management System (ISMS)',
    icon: ratingsIso1,
  },
  {
    code: 'ISO 22301:2019',
    name: 'Business Continuity Management System (BCMS)',
    icon: ratingsIso2,
  },
  {
    code: 'ISO 20000:2018',
    name: 'Service Management System (ITSMS)',
    icon: ratingsIso3,
  },
  {
    code: 'Agusto & Co.',
    name: 'AA Rating 2025',
    icon: ratingsAgu,
  },
]

export const FOOTER_LINKS = [
  { label: 'Eligibility Criteria', to: '/eligibility' },
  { label: 'About', to: '/about' },
  { label: 'Careers', to: '/career' },
  { label: 'Policies', to: '/resources/policies' },
  { label: 'Whistleblowing', to: '/resources/whistleblowing' },
  { label: 'Complaints', to: '/resources/complaints' },
]

export const PFI_LIST = [
  'GTBank', 'Access Bank', 'Ecobank', 'UBA', 'FCMB', 'Sterling',
  'Fidelity Bank', 'Stanbic IBTC', 'Providus Bank', 'Wema Bank',
  'Globus Bank', 'Nova Bank', 'Union Bank', 'Zenith Bank',
  'Bank of Industry', 'FSDH Merchant Bank', 'Coronation Merchant Bank',
  'Greenwich Merchant Bank', 'LAPO Microfinance Bank',
  'Baobab Microfinance Bank', 'TAJ Bank', 'Lotus Bank',
]

export const IMPACT_STATS = [
  { label: 'Total Loans Guaranteed', value: '>₦452bn', delta: '+31% vs Dec 2024' },
  { label: 'MSMEs Supported Directly', value: '104,881', delta: '+30% vs Dec 2024' },
  { label: 'Active Guarantees', value: '7,465', delta: '+34% vs Dec 2024' },
  { label: 'Total Jobs Supported', value: '191,798', delta: '+30% vs Dec 2024' },
  { label: 'Female Borrowers', value: '21%', delta: '≈22,025 women supported' },
  { label: 'Youth Borrowers (18–35)', value: '15%', delta: '≈15,732 youth supported' },
  { label: 'MSMEs Supported Indirectly', value: '70,000+', delta: 'Via blanket & portfolio guarantees' },
  { label: 'Augusto & Co. Rating', value: 'Aa', delta: '2025 assessment' },
]

// Quarterly snapshots of the homepage's "Impact at a glance" dashboard —
// illustrative/placeholder figures (same status as IMPACT_STATS above,
// which stays as the fixed Sept 2025 baseline used on the /impact page)
// projected forward at a steady ~8% quarter-on-quarter pace so the date
// switcher has plausible, monotonically increasing data to show. Replace
// with real quarterly figures from ICGL when available. Ordered oldest to
// newest; the dashboard defaults to the last entry.
export const IMPACT_PERIODS = [
  {
    period: 'September 2025',
    stats: IMPACT_STATS,
  },
  {
    period: 'December 2025',
    stats: [
      { label: 'Total Loans Guaranteed', value: '>₦489bn', delta: '+8% vs Sep 2025' },
      { label: 'MSMEs Supported Directly', value: '112,900', delta: '+8% vs Sep 2025' },
      { label: 'Active Guarantees', value: '8,050', delta: '+8% vs Sep 2025' },
      { label: 'Total Jobs Supported', value: '205,600', delta: '+7% vs Sep 2025' },
      { label: 'Female Borrowers', value: '22%', delta: '≈24,838 women supported' },
      { label: 'Youth Borrowers (18–35)', value: '16%', delta: '≈18,064 youth supported' },
      { label: 'MSMEs Supported Indirectly', value: '74,000+', delta: 'Via blanket & portfolio guarantees' },
      { label: 'Augusto & Co. Rating', value: 'Aa', delta: 'December 2025 assessment' },
    ],
  },
  {
    period: 'March 2026',
    stats: [
      { label: 'Total Loans Guaranteed', value: '>₦528bn', delta: '+8% vs Dec 2025' },
      { label: 'MSMEs Supported Directly', value: '121,700', delta: '+8% vs Dec 2025' },
      { label: 'Active Guarantees', value: '8,670', delta: '+8% vs Dec 2025' },
      { label: 'Total Jobs Supported', value: '219,500', delta: '+7% vs Dec 2025' },
      { label: 'Female Borrowers', value: '22%', delta: '≈26,774 women supported' },
      { label: 'Youth Borrowers (18–35)', value: '16%', delta: '≈19,472 youth supported' },
      { label: 'MSMEs Supported Indirectly', value: '78,000+', delta: 'Via blanket & portfolio guarantees' },
      { label: 'Augusto & Co. Rating', value: 'Aa', delta: 'March 2026 assessment' },
    ],
  },
  {
    period: 'June 2026',
    stats: [
      { label: 'Total Loans Guaranteed', value: '>₦572bn', delta: '+8% vs Mar 2026' },
      { label: 'MSMEs Supported Directly', value: '131,400', delta: '+8% vs Mar 2026' },
      { label: 'Active Guarantees', value: '9,360', delta: '+8% vs Mar 2026' },
      { label: 'Total Jobs Supported', value: '234,000', delta: '+7% vs Mar 2026' },
      { label: 'Female Borrowers', value: '23%', delta: '≈30,222 women supported' },
      { label: 'Youth Borrowers (18–35)', value: '16%', delta: '≈21,024 youth supported' },
      { label: 'MSMEs Supported Indirectly', value: '83,000+', delta: 'Via blanket & portfolio guarantees' },
      { label: 'Augusto & Co. Rating', value: 'Aa', delta: 'June 2026 assessment' },
    ],
  },
]

// Cumulative "Total Loans Guaranteed" by year-end, ₦bn — 2025 lines up with
// the "+31% vs Dec 2024" delta above (452 / 1.31 ≈ 345).
export const LOANS_GROWTH = [
  { year: '2021', value: 85 },
  { year: '2022', value: 156 },
  { year: '2023', value: 248 },
  { year: '2024', value: 345 },
  { year: '2025', value: 452 },
]

export const SECTOR_TABLE = [
  { sector: 'Trade & Commerce', loans: '₦152bn', msmes: '35,840', jobs: '58,420', female: '28%', youth: '22%', status: 'Active' },
  { sector: 'Agriculture', loans: '₦118bn', msmes: '28,320', jobs: '42,180', female: '18%', youth: '14%', status: 'Active' },
  { sector: 'Manufacturing', loans: '₦86bn', msmes: '16,780', jobs: '36,540', female: '12%', youth: '10%', status: 'Active' },
  { sector: 'Services', loans: '₦54bn', msmes: '13,420', jobs: '29,860', female: '31%', youth: '19%', status: 'Active' },
  { sector: 'Technology', loans: '₦22bn', msmes: '6,240', jobs: '24,798', female: '24%', youth: '48%', status: 'Growing' },
  { sector: 'Healthcare', loans: '₦12bn', msmes: '2,940', jobs: '—', female: '42%', youth: '18%', status: 'Emerging' },
  { sector: 'Education', loans: '₦8bn', msmes: '1,341', jobs: '—', female: '38%', youth: '16%', status: 'Emerging' },
]

export const ZONE_TABLE = [
  { zone: 'South West', msmes: '31,464' },
  { zone: 'North West', msmes: '22,025' },
  { zone: 'North Central', msmes: '18,879' },
  { zone: 'South South', msmes: '16,782' },
  { zone: 'South East', msmes: '10,488' },
  { zone: 'North East', msmes: '5,243' },
]

export const PFI_CATEGORIES = [
  { label: 'Commercial Banks', count: '15 PFIs' },
  { label: 'Merchant Banks', count: '3 PFIs' },
  { label: 'Microfinance Banks', count: '2 PFIs' },
  { label: 'Development Finance', count: '1 PFI' },
  { label: 'Non-Interest Banks', count: '2 PFIs' },
]

export const SERVICES = [
  {
    slug: 'individual-guarantee',
    title: 'Individual Guarantee',
    summary: 'For single loans to a single, known borrower, ICGL performs direct appraisal.',
    icon: FileCheck2,
  },
  {
    slug: 'blanket-guarantee',
    title: 'Blanket Guarantee',
    summary: 'Authority to guarantee a portfolio of loans is vested in the PFI.',
    icon: Layers,
  },
  {
    slug: 'portfolio-guarantee',
    title: 'Portfolio Guarantee',
    summary: 'Guarantees a portfolio of loans to a target segment, up to a defined ceiling.',
    icon: PieChart,
  },
  {
    slug: 'technical-assistance',
    title: 'Technical Assistance',
    summary: 'Specialised capacity building and advisory services to enhance PFI and MSME operational efficiency.',
    icon: GraduationCap,
  },
]

// Bios sourced from ICGL's official Board of Directors / Management Team
// bio document (BOD-MT.docx). `linkedin` links are still placeholder '#'
// hrefs pending real profile URLs from ICGL.
export const BOARD = [
  {
    slug: 'abubakar-jimoh',
    name: 'Abubakar Jimoh',
    role: 'Chairman, Board of Directors',
    photo: abubakarJimoh,
    badge: 'Chair',
    linkedin: '#',
    bio: [
      'Abubakar Aribidesi Jimoh is the founder and Group Chief Executive Officer of TrustBanc Holdings Limited, a non-operating financial holding company. He holds a bachelor’s and master’s degree in Finance from the University of Lagos, and is a Chartered Financial Analyst, Certified General Accountant, Chartered Internal Auditor and Financial Risk Manager.',
      'He has over 25 years of experience in the banking industry and has managed and built profitable financial institutions that have grown to become market leaders in their segments. Abubakar started out as a National Youth Service Corps member at Lion Bank in 1988 before joining Prime Merchant Bank Limited (Corporate Banking) as AM/Head of Special Projects in 1990. He went on to serve as Head of Securities Trading and Treasury at Express Discount Limited (1993); Manager (RBC Investments, IAS) at RBC Financial Group, Toronto (1999); Division Chief, Private Sector Portfolio Management at the African Development Bank (2005); Divisional Head/GM, Balance Sheet Management/Market Risk & Investor Relations at UBA Group (2008); and Managing Director/Chief Operating Officer of Coronation Merchant Bank Limited (formerly Associate Discount House Limited) in 2011.',
      'He is currently the Group Chief Executive Officer of TrustBanc Holdings Limited, a company he founded in 2013 focused on wealth management, ethical and conventional investment management, securities trading, lending, and forex. Abubakar is a graduate of London Business School and Lagos Business School, where he undertook training in Strategic Investment Management and Advanced Management. He is a Fellow of the Chartered Institute of Bankers and the Institute of Chartered Accountants of Nigeria, and a former member of the Central Bank of Nigeria-led Bankers’ Committee.',
    ],
  },
  {
    slug: 'tony-okpanachi',
    name: 'Dr. Tony Okpanachi',
    role: 'Non-Executive Director',
    photo: tonyOkpanachi,
    linkedin: '#',
    bio: [
      'Dr. Tony Okpanachi was appointed Managing Director/Chief Executive Officer of the Development Bank of Nigeria in January 2017.',
      'Dr. Tony Okpanachi is a seasoned banker with over 27 years’ experience. Before being appointed Managing Director/CEO of the Development Bank of Nigeria Plc ("DBN"), he was the Deputy Managing Director of Ecobank Nigeria Limited, a position he held since April 2013. Before that, he was the Managing Director, Ecobank Kenya and Cluster Managing Director for East Africa, Ecobank (comprising Kenya, Uganda, Tanzania, Burundi, Rwanda, South Sudan and Ethiopia). He was also, at various times, Managing Director of Ecobank Malawi and Regional Coordinator for Lagos and South West at Ecobank Nigeria.',
      'Earlier in his professional career, he managed various portfolios including Treasury Management, Retail Business Development, Corporate Finance, Corporate Services, Branch Management and Relationship Management.',
      'He holds a Master’s in Business Administration (MBA) from the Manchester Business School UK, a Master of Science degree in Economics from the University of Lagos, and a Bachelor of Science degree in Economics from the Ahmadu Bello University, Zaria, Nigeria.',
      'He has attended several Executive Management Development Programmes in Leadership, Corporate Governance, Credit and Risk Management at leading institutions.',
    ],
  },
  {
    slug: 'chioma-sideso',
    name: 'Chioma Sideso',
    role: 'Independent Non-Executive Director',
    photo: chiomaSideso,
    linkedin: '#',
    bio: [
      'Chioma Sideso is a seasoned strategic leader with experience in complex developing markets. She has over fifteen years’ board experience in highly regulated sectors as an executive director, independent director and non-executive director, ranging from start-ups to well-established private and publicly listed companies in industries as diverse as logistics, mining, insurance, and financial services.',
      'She spent over a decade as the CEO of NSIA Insurance Ltd, a Pan-African financial services provider with a vast footprint across Africa, participating in steering the African expansion strategy. With strengths in governance, strategy, performance improvement and culture change, she is an experienced business leader and board director with a successful record of growing and transforming businesses in diverse sectors. She has extensive knowledge of doing business in Africa and has chaired cross-functional, multilingual teams to ensure growth strategies are achieved. Chioma has facilitated numerous development programs promoting financial inclusion and supported projects indicative of the strong ESG business model adopted.',
      'She built her early career in banking and insurance and began forging a path in Nigeria’s insurance industry, where she became passionate about change management and transformation. Under her leadership, NSIA received recognition as an “Employer of Choice”. Chioma pursued a law degree at the University of Kent, Canterbury before completing her MBA at the University of Leicester, UK. She is an Associate of the Chartered Insurance Institute (ACII) UK, has received a Professional Diploma in Marketing from the Chartered Institute of Marketing (CIM) UK, and is currently enroute to becoming a Chartered Director with the Institute of Directors UK.',
      'Chioma is an avid traveller and enjoys an active lifestyle filled with sports, travel, and the pursuit of new experiences.',
    ],
  },
  {
    slug: 'baqi-salihu',
    name: 'Baqi Salihu',
    role: 'Independent Non-Executive Director',
    photo: baqiSalihu,
    linkedin: '#',
    bio: [
      'Baqi Salihu is a seasoned professional with over 18 years of substantive experience in Mobile Telecoms Engineering, Operations, RF Planning & Optimization, and Digital Services. He is a highly accomplished and result-oriented ICT expert with a proven record of building, managing, and growing technology departments and organizations.',
      'Baqi started his career in mobile communication in 2003 with ZTE Corporation of China in the Research Division. He also worked at MTN Nigeria between 2005 and 2008 before joining Etisalat Nigeria in December 2008.',
      'Baqi holds a bachelor’s degree in Electrical and Computer Engineering from the Federal University of Technology, Minna. He also has a postgraduate certificate in Artificial Intelligence and Machine Learning from the McCombs School of Business, University of Texas.',
      'Baqi led the Network Quality of Service and Support Department as Acting Director from November 2017 and as substantive Director of the same department since May 2018. He additionally led Network Engineering and Network Deployment up till December 2020, and has been Deputy Chief Technical Officer since January 2021 — building new and refining existing technology solutions to deliver value to all stakeholders since joining the then-Etisalat on December 15, 2008.',
      'He completed a two-year Massachusetts Institute of Technology Regional Entrepreneurship Acceleration Program in 2021.',
    ],
  },
  {
    slug: 'anthony-asonye',
    name: 'Anthony Asonye',
    role: 'Managing Director / CEO',
    photo: anthonyAsonye,
    linkedin: '#',
    bio: [
      'Anthony Asonye has over 24 years Banking and Development Finance experience cutting across key leadership roles in Banking Operations, Risk Management and Business Development.',
      'He joined the Development Bank of Nigeria PLC Group in May 2019 as the pioneer CEO of Impact Credit Guarantee Limited, a wholly owned subsidiary of the Development Bank of Nigeria PLC.',
      'Anthony joined the United Bank for Africa PLC as a management trainee and his career has spanned programmes including the Executive Development Diamond Bank PLC, Stanbic IBTC Bank PLC, Standard Chartered Bank Limited and Union Bank PLC where he rose to key management positions in Risk and Business — notably Head, Credit Analysis; Divisional Executive, Commercial Banking; and Head, SME Banking.',
      'As an experienced risk manager and business development enthusiast, he championed the automation of MSME, Consumer and Small Corporate Lending with the implementation of the KASTLE ULS at Diamond Bank PLC (now Access Bank Plc) and CAMS Lending Solution at Stanbic IBTC.',
      'Anthony is an Accounting graduate of the University of Calabar and holds an MBA degree from the University of Benin. He is a Fellow of the Institute of Chartered Accountants of Nigeria and a Standard Bank certified credit coach.',
      'He has attended a number of managerial and leadership programmes including the Executive Development programme of the Wharton Business School, The University of Pennsylvania, USA.',
    ],
  },
  {
    slug: 'zainab-aliyu',
    name: 'Zainab Aliyu',
    role: 'Independent Non-Executive Director',
    photo: zainabAliyu,
    linkedin: '#',
    bio: [
      'Zainab Aliyu is a UK- and Big 4-trained Fellow of the Association of Chartered Certified Accountants (ACCA), with over 18 years of strategic finance and operations leadership experience across the energy, telecoms, and entrepreneurial sectors.',
      'Her career spans FTSE- and AIM-listed companies, bringing deep expertise in corporate governance, financial strategy, risk management, compliance, and business transformation. She is recognised as a results-driven executive who has led high-impact initiatives in IFRS implementation, cash flow optimisation, cost control, and operational efficiency, consistently delivering measurable value.',
      'Her board portfolio also includes roles at Robert & John (Telecoms & EdTech) as Chair of Governance & Remuneration Committee; Leadway Pensure, where she serves on key committees in Finance & Strategy, Risk & Compliance, and Audit; and Interconnect Clearing House on the Finance & General Purposes Committee.',
      'Previously, she held senior finance leadership roles including Director of Finance at Yerwa Aid & Relief Foundation and Financial Controller at Oriental Energy Resources, achieving significant savings and efficiencies. Earlier in her career, she honed her world-class auditing skills at Baker Hughes and Deloitte LLP, leading critical compliance and operational audit projects.',
      'Beyond her corporate roles, Zainab is the Founder & CEO of AABOUX, a contemporary luxury leather brand merging African heritage craftsmanship with innovation, sustainability, and community impact. She is passionate about driving entrepreneurship with purpose and advancing women in leadership.',
      'At ICGL, Zainab currently serves on the Board as an Independent Non-Executive Director, contributing her expertise to strengthen governance, oversight, and strategic direction.',
    ],
  },
]

export const MANAGEMENT = [
  {
    slug: 'anthony-asonye',
    name: 'Anthony Asonye',
    role: 'Managing Director / CEO',
    photo: anthonyAsonye,
    badge: 'CEO',
    linkedin: '#',
    bio: [
      'Anthony Asonye has over 24 years Banking and Development Finance experience cutting across key leadership roles in Banking Operations, Risk Management and Business Development.',
      'He joined the Development Bank of Nigeria PLC Group in May 2019 as the pioneer CEO of Impact Credit Guarantee Limited, a wholly owned subsidiary of the Development Bank of Nigeria PLC.',
      'Anthony joined the United Bank for Africa PLC as a management trainee and his career has spanned programmes including the Executive Development Diamond Bank PLC, Stanbic IBTC Bank PLC, Standard Chartered Bank Limited and Union Bank PLC where he rose to key management positions in Risk and Business — notably Head, Credit Analysis; Divisional Executive, Commercial Banking; and Head, SME Banking.',
      'As an experienced risk manager and business development enthusiast, he championed the automation of MSME, Consumer and Small Corporate Lending with the implementation of the KASTLE ULS at Diamond Bank PLC (now Access Bank Plc) and CAMS Lending Solution at Stanbic IBTC.',
      'Anthony is an Accounting graduate of the University of Calabar and holds an MBA degree from the University of Benin. He is a Fellow of the Institute of Chartered Accountants of Nigeria and a Standard Bank certified credit coach.',
      'He has attended a number of managerial and leadership programmes including the Executive Development programme of the Wharton Business School, The University of Pennsylvania, USA.',
    ],
  },
  {
    slug: 'adedamola-adedotun',
    name: 'Adedamola Adedotun',
    role: 'Chief Financial Officer',
    photo: adedamolaAdedotun,
    linkedin: '#',
    bio: [
      'Adedamola Adedotun is a finance professional with 15 years’ experience in auditing, investment banking, accounting and finance.',
      'He started his professional career at PricewaterhouseCoopers, where he performed audit and consulting work for companies in the Oil and Gas Industry. He worked at various times at Bank PHB Plc. (now Keystone Bank Limited), Oando Gas and Power Limited (the gas and power division of Oando Plc.), and FBN Holdings Plc. Prior to joining Impact Credit Guarantee Limited as pioneer Chief Financial Officer, he was the CFO of FBN Quest Capital Limited, responsible for financial reporting, capital and balance sheet management, tax management, as well as budgeting and planning.',
      'He is an Accounting graduate of Yaba College of Technology and holds an MBA from Warwick Business School. He is also an associate member of the Institute of Chartered Accountants of Nigeria.',
    ],
  },
  {
    slug: 'chioma-kema-ogwo',
    name: 'Chioma Kema Ogwo',
    role: 'Head, Operations',
    photo: chiomaKemaOgwo,
    linkedin: '#',
    bio: [
      'Chioma Kema Ogwo is an experienced strategy, product development, and portfolio management professional with over 20 years of expertise in the financial services sector. She has a well-rounded background spanning business development, risk management, stakeholder engagement, and financial inclusion, with a strong focus on driving impact within the MSME ecosystem.',
      'Prior to joining Impact Credit Guarantee Limited, Chioma held leadership roles at Access Bank Plc and Diamond Bank Plc, where she played a pivotal role in structuring financial and non-financial solutions for MSMEs, developing strategic partnerships, and deploying high-impact initiatives that contributed to financial inclusion, gender empowerment, and economic development. She is deeply committed to building strategic partnerships and has successfully led programs in collaboration with organizations such as the World Bank, the Federal Government, Central Bank of Nigeria (CBN), Medical Credit Fund (MCF), and FMO, to create sustainable solutions for MSMEs and promote financial inclusion.',
      'Chioma is a qualified lawyer and holds a Barrister-at-Law (B.L.) from the Nigerian Law School and an LL.B from the University of Lagos. She has also received specialized training in Financial Development and Inclusion from the IMF Institute and the Enterprise Development Center.',
      'She is passionate about leveraging finance as a tool for business growth, economic development, and gender inclusion, and is committed to driving innovation and sustainable impact in the financial sector.',
    ],
  },
  {
    slug: 'cletus-ebe',
    name: 'Dr. Cletus Ebe',
    role: 'Head, Internal Audit',
    photo: cletusEbe,
    linkedin: '#',
    bio: [
      'Dr. Cletus Ebe is a distinguished governance, risk, and compliance professional with over 22 years of progressive experience spanning banking, electronic payments, and publishing.',
      'He has built a formidable career across leading institutions, particularly in the banking sector. He previously served as the Chief Audit Executive and Chief Compliance Officer at MoneyMaster Payment Service Bank, where he was responsible for managing regulatory compliance, AML/CFT/CPF frameworks, and internal control systems. His impressive 15-year tenure at Zenith Bank Plc saw him rise to the role of Regional Audit Supervisor and Team Lead, IT Audit & Control (Card Services and E-Settlement Audit). In this capacity, he led critical reviews of branch operations, e-settlement platforms, cybersecurity frameworks, and fraud investigations.',
      'In March 2025, Dr. Ebe joined Impact Credit Guarantee Ltd (a wholly owned subsidiary of the Development Bank of Nigeria) as the Head of Internal Audit, bringing his wealth of experience to support the company’s governance and risk assurance objectives.',
      'He holds a PhD, MSc, and BSc in Accounting from Babcock University, an MBA from Obafemi Awolowo University, and an HND in Accountancy from Kwara State Polytechnic. He is a Fellow of the Institute of Chartered Accountants of Nigeria (ICAN), a Certified Information Systems Auditor (CISA), and an ISO 27001 Lead Auditor, with extensive training in internal controls, fraud detection, cybersecurity auditing, and regulatory compliance.',
    ],
  },
]

// Illustrative job-description content for each open role, written to match
// ICGL's mandate and tone. Contact email and application flow mirror the
// address already used on the Career page; content is placeholder pending
// finalised job descriptions from HR.
export const VACANCIES = [
  {
    slug: 'finance-manager',
    title: 'Finance Manager',
    location: 'Lagos',
    employmentType: 'Full-time',
    department: 'Finance & Accounts',
    reportsTo: 'Chief Financial Officer',
    contactEmail: 'info@impactguaranteeng.com',
    deadline: '3 April, 2026',
    description:
      'ICGL is seeking an experienced Finance Manager to oversee the day-to-day financial operations of the company, including financial reporting, budgeting, treasury, and regulatory compliance. The role is central to maintaining the financial discipline that underpins ICGL’s guarantee obligations and its Aa credit rating.',
    background:
      'Impact Credit Guarantee Limited (ICGL) is a wholly-owned subsidiary of the Development Bank of Nigeria Plc (DBN), established to provide partial credit guarantees that de-risk lending to MSMEs and small corporates across Nigeria. With over ₦452 billion in guarantees issued and a growing network of Participating Financial Institutions, ICGL is scaling its finance function to match the pace of its guarantee portfolio.',
    objective:
      'To manage ICGL’s financial reporting, planning, and control functions, ensuring accurate, timely, and compliant financial information that supports sound decision-making by management and the Board.',
    scopeOfWork: [
      'Prepare monthly, quarterly, and annual financial statements in line with IFRS and regulatory requirements.',
      'Develop and monitor the annual budget, tracking performance against approved targets.',
      'Oversee treasury operations, including cash flow management and banking relationships.',
      'Ensure compliance with CBN regulations, tax obligations, and other statutory requirements.',
      'Coordinate external audits and liaise with auditors, regulators, and rating agencies.',
      'Support the CFO with financial models, board reports, and investor/DBN reporting.',
      'Maintain and strengthen internal financial controls across the organisation.',
    ],
    conductOfWork:
      'The Finance Manager will report directly to the Chief Financial Officer and work closely with the Risk, Internal Audit, and Operations teams. The role requires strict adherence to ICGL’s financial policies, confidentiality of sensitive financial data, and the highest standards of professional and ethical conduct expected of a DBN-backed financial institution.',
    reportingObligations:
      'The successful candidate will submit monthly management accounts and cash flow reports to the CFO, and contribute to quarterly Board finance packs and annual statutory financial statements within the timelines set by management.',
    applicationProcess:
      'Interested and qualified candidates should submit a comprehensive CV and a cover letter stating their suitability for the role to info@impactguaranteeng.com, with "Finance Manager" as the subject line, on or before the application deadline. Only shortlisted candidates will be contacted.',
    requiredQualifications: [
      'Bachelor’s degree in Accounting, Finance, or a related field; a relevant Master’s degree is an advantage.',
      'Professional accounting certification (ICAN, ACCA, or CPA) is required.',
      'Minimum of 7 years’ post-qualification experience in financial management, preferably within banking, guarantee, or development finance institutions.',
      'Strong knowledge of IFRS, financial modelling, and regulatory reporting.',
      'Proficiency in accounting and ERP systems, with advanced Excel skills.',
    ],
    paymentSchedule:
      'Remuneration is competitive and commensurate with experience, benchmarked against industry standards for guarantee and development finance institutions in Nigeria. Salary is paid monthly in arrears, subject to standard statutory deductions.',
  },
  {
    slug: 'head-of-risk-management',
    title: 'Head of Risk Management',
    location: 'Lagos',
    employmentType: 'Full-time',
    department: 'Risk Management',
    reportsTo: 'Managing Director / CEO',
    contactEmail: 'info@impactguaranteeng.com',
    deadline: '1 May, 2026',
    description:
      'ICGL is looking for a seasoned risk management professional to lead the enterprise risk function, safeguarding the integrity of the guarantee portfolio while enabling responsible growth in support of MSMEs and small corporates across Nigeria.',
    background:
      'As a wholly-owned subsidiary of the Development Bank of Nigeria Plc, ICGL provides partial credit guarantees to Participating Financial Institutions, de-risking lending to MSMEs and small corporates. Robust risk management is core to how ICGL protects its guarantee obligations and maintains its Aa credit rating from Agusto & Co.',
    objective:
      'To design, implement, and oversee ICGL’s enterprise risk management framework, ensuring credit, operational, and portfolio risks are identified, measured, and managed within the company’s risk appetite.',
    scopeOfWork: [
      'Develop and maintain ICGL’s enterprise risk management framework and policies.',
      'Assess and monitor credit risk exposure across the guarantee portfolio and PFI network.',
      'Conduct stress testing and scenario analysis on portfolio performance.',
      'Present risk reports and recommendations to the Board Risk Committee.',
      'Ensure risk practices align with CBN guidelines and World Bank safeguard standards.',
      'Lead the risk team in due diligence for new guarantee facilities and PFI onboarding.',
      'Collaborate with Internal Audit and Compliance to strengthen the overall control environment.',
    ],
    conductOfWork:
      'The Head of Risk Management will report to the Managing Director/CEO and engage regularly with the Board Risk Committee. The role demands independent judgement, discretion in handling sensitive portfolio data, and consistent alignment with ICGL’s governance and ethical standards.',
    reportingObligations:
      'The role holder will provide monthly portfolio risk updates to executive management and quarterly risk reports to the Board Risk Committee, in addition to ad-hoc reporting on material risk events.',
    applicationProcess:
      'Interested and qualified candidates should submit a comprehensive CV and a cover letter stating their suitability for the role to info@impactguaranteeng.com, with "Head of Risk Management" as the subject line, on or before the application deadline. Only shortlisted candidates will be contacted.',
    requiredQualifications: [
      'Bachelor’s degree in Finance, Economics, Risk Management, or a related field; a relevant Master’s degree is an advantage.',
      'Professional risk certification (e.g. FRM, PRM, or equivalent) is desirable.',
      'Minimum of 10 years’ experience in credit or enterprise risk management, ideally within banking or guarantee institutions.',
      'Strong analytical skills with experience in portfolio risk modelling and stress testing.',
      'Sound understanding of CBN regulatory requirements and credit guarantee schemes.',
    ],
    paymentSchedule:
      'Remuneration is competitive and commensurate with experience, benchmarked against senior risk roles in Nigeria’s banking and development finance sector. Salary is paid monthly in arrears, subject to standard statutory deductions.',
  },
  {
    slug: 'data-analyst',
    title: 'Data Analyst',
    location: 'Lagos',
    employmentType: 'Full-time',
    department: 'Strategy & Business Intelligence',
    reportsTo: 'Head of Strategy',
    contactEmail: 'info@impactguaranteeng.com',
    deadline: '10 May, 2026',
    description:
      'ICGL is seeking a detail-oriented Data Analyst to turn guarantee portfolio and impact data into clear, actionable insight for management, the Board, and development partners.',
    background:
      'ICGL provides partial credit guarantees that de-risk MSME and small corporate lending across Nigeria, and reports regularly on portfolio growth, job creation, and financial inclusion outcomes. Reliable, well-structured data underpins both internal decision-making and ICGL’s external impact reporting.',
    objective:
      'To collect, clean, analyse, and visualise data across ICGL’s guarantee portfolio and impact indicators, supporting evidence-based decisions by management and accurate reporting to stakeholders.',
    scopeOfWork: [
      'Maintain and update dashboards tracking guarantee issuance, portfolio performance, and impact metrics.',
      'Clean and validate data received from Participating Financial Institutions.',
      'Conduct trend and variance analysis to support quarterly management and Board reporting.',
      'Build and maintain data models supporting the Impact at a Glance figures published on ICGL’s website.',
      'Support the Strategy team with ad-hoc analysis for new products and partnerships.',
      'Document data sources, definitions, and methodology to ensure consistency across reports.',
    ],
    conductOfWork:
      'The Data Analyst will report to the Head of Strategy and work cross-functionally with Risk, Finance, and Communications. The role requires careful handling of sensitive PFI and MSME data in line with ICGL’s data governance and confidentiality policies.',
    reportingObligations:
      'The role holder will deliver monthly portfolio and impact dashboards to the Strategy team, and contribute data and analysis to quarterly management reports within agreed timelines.',
    applicationProcess:
      'Interested and qualified candidates should submit a comprehensive CV and a cover letter stating their suitability for the role to info@impactguaranteeng.com, with "Data Analyst" as the subject line, on or before the application deadline. Only shortlisted candidates will be contacted.',
    requiredQualifications: [
      'Bachelor’s degree in Statistics, Economics, Computer Science, or a related quantitative field.',
      'Minimum of 3 years’ experience in a data analysis or business intelligence role.',
      'Proficiency in SQL and data visualisation tools (e.g. Power BI, Tableau, or similar).',
      'Strong Excel skills and familiarity with basic statistical analysis.',
      'Excellent attention to detail and ability to communicate findings clearly to non-technical audiences.',
    ],
    paymentSchedule:
      'Remuneration is competitive and commensurate with experience, benchmarked against similar analytical roles in Nigeria’s financial services sector. Salary is paid monthly in arrears, subject to standard statutory deductions.',
  },
]

export const NEWS = [
  {
    category: 'Press Release',
    date: '14 March 2026',
    readTime: '4 min read',
    title: 'ICGL Achieves AA Credit Rating from Agusto & Co. for Third Consecutive Year',
    body: "Impact Credit Guarantee Limited (ICGL) has once again been assigned an AA credit rating by Agusto & Co., Nigeria's leading credit rating agency, reflecting ICGL's strong financial position, robust governance framework, and consistent track record of honouring guarantee obligations.",
    image: newsChartsPhoto,
  },
  {
    category: 'Partnership',
    date: '02 February 2026',
    readTime: '3 min read',
    title: 'ICGL Signs New Guarantee Agreement with Three Leading Microfinance Banks',
    body: 'ICGL has expanded its network of Participating Financial Institutions with the onboarding of three leading microfinance banks, extending guaranteed lending capacity to underserved rural and semi-urban communities.',
    image: newsHandshakePhoto,
  },
  {
    category: 'Announcement',
    date: '18 January 2026',
    readTime: '5 min read',
    title: 'ICGL Launches Enhanced Agricultural Guarantee Product for Smallholder Farmers',
    body: 'A new guarantee product designed specifically to support smallholder farmers and agribusinesses has been launched, providing expanded coverage for loans in the agricultural value chain.',
    image: newsMsmePhoto,
  },
  {
    category: 'Event',
    date: '10 December 2025',
    readTime: '4 min read',
    title: 'ICGL Hosts Annual PFI Forum on MSME Credit Risk Management',
    body: "Over 120 representatives from Participating Financial Institutions gathered at ICGL's annual PFI Forum to discuss best practices in MSME credit risk management and the evolving role of guarantee instruments.",
    image: newsTeamPhoto,
  },
  {
    category: 'Press Release',
    date: '05 November 2025',
    readTime: '3 min read',
    title: 'ICGL Reports ₦12 Billion in Guarantees Issued in 2025 — A Record High',
    body: 'ICGL has announced a record ₦12 billion in credit guarantees issued in the 2025 financial year, up 34% from the previous year, supporting over 3,800 MSMEs across Nigeria.',
    image: newsChartsPhoto,
  },
  {
    category: 'Partnership',
    date: '22 September 2025',
    readTime: '4 min read',
    title: 'ICGL and IFC Sign Technical Assistance Agreement to Strengthen MSME Lending',
    body: 'ICGL has signed a Technical Assistance agreement with the International Finance Corporation (IFC) to strengthen capacity for MSME lending across its network of Participating Financial Institutions.',
    image: newsHandshakePhoto,
  },
  {
    category: 'Announcement',
    date: '08 August 2025',
    readTime: '3 min read',
    title: 'ICGL Achieves ISO 27001, ISO 22301, and ISO 20000 Certifications',
    body: "ICGL has successfully achieved three international ISO certifications in Information Security, Business Continuity, and Service Management, underscoring its commitment to operational excellence and data governance.",
    image: newsMsmePhoto,
  },
]

export const FAQ_SECTIONS = [
  {
    title: 'About ICGL',
    items: [
      {
        q: 'What is ICGL?',
        a: 'Impact Credit Guarantee Limited (ICGL) is a wholly owned subsidiary of the Development Bank of Nigeria Plc (DBN), established to provide partial credit guarantees to eligible Participating Financial Institutions (PFIs) to de-risk lending to MSMEs and small corporates in Nigeria.',
      },
      {
        q: 'What does ICGL stand for?',
        a: 'ICGL stands for Impact Credit Guarantee Limited. The name reflects our mandate of creating measurable impact through credit guarantee mechanisms that unlock finance for underserved businesses in Nigeria.',
      },
      {
        q: "What is ICGL's core mandate?",
        a: "ICGL's core mandate is to facilitate access to finance among MSMEs through eligible Participating Financial Institutions (PFIs) in a sustainable and market-oriented way by providing credit guarantees and technical assistance to PFIs.",
      },
      {
        q: 'Is ICGL sector-specific or sector-agnostic?',
        a: 'ICGL is broadly sector-agnostic and supports MSMEs across a range of productive sectors in Nigeria, including agriculture, manufacturing, trade, and services, subject to eligibility criteria and the policies of participating financial institutions.',
      },
      {
        q: 'What types of businesses does ICGL work with?',
        a: 'ICGL works with Micro, Small and Medium Enterprises (MSMEs) and, to a limited extent, small corporates in Nigeria. Eligible businesses must meet the criteria set by ICGL and must access finance through a participating financial institution (PFI).',
      },
      {
        q: 'What makes ICGL different from traditional lenders?',
        a: 'Unlike traditional lenders, ICGL does not lend money directly to businesses. Instead, ICGL provides credit guarantees to financial institutions, which reduces the risk for the lender and enables them to extend loans to MSMEs that would otherwise be considered too risky or lack sufficient collateral.',
      },
    ],
  },
  {
    title: 'Partial Credit Guarantees',
    items: [
      {
        q: 'What is a Partial Credit Guarantee?',
        a: 'A Partial Credit Guarantee (PCG) is a financial instrument in which ICGL agrees to cover a portion of a loan extended by a financial institution to an MSME borrower in the event of default. This shared risk arrangement encourages financial institutions to lend to businesses they might otherwise consider too risky.',
      },
      {
        q: 'Who benefits from a Partial Credit Guarantee?',
        a: "Both MSMEs and financial institutions benefit. MSMEs gain access to credit they might not otherwise qualify for, while financial institutions are able to expand their lending portfolios with reduced credit risk exposure, supported by ICGL's guarantee cover.",
      },
      {
        q: 'What percentage of the loan does ICGL guarantee?',
        a: 'ICGL typically provides a partial guarantee, covering a defined percentage of the outstanding loan amount. The specific percentage varies based on the guarantee product and the agreement with the participating financial institution.',
      },
      {
        q: 'Does ICGL lend money directly?',
        a: "No. ICGL does not lend money directly to businesses. ICGL operates exclusively through Participating Financial Institutions (PFIs). All lending is facilitated through these partner institutions, which use ICGL's guarantees to underwrite loans to eligible MSMEs.",
      },
      {
        q: 'Are there fees associated with ICGL guarantees?',
        a: 'Yes, a guarantee fee is charged for the credit guarantee facility. This fee is typically passed on to the borrower by the PFI and is factored into the overall cost of the loan.',
      },
    ],
  },
  {
    title: 'Eligibility & Application',
    items: [
      {
        q: 'Who can apply for ICGL support?',
        a: 'MSMEs and small corporates registered in Nigeria that are seeking credit from a Participating Financial Institution (PFI) can benefit from ICGL’s guarantee support. Applications are made through the PFI, not directly to ICGL.',
      },
      {
        q: 'What are the eligibility criteria for businesses?',
        a: 'Eligible businesses must be MSMEs or small corporates registered and operating in Nigeria, applying for a loan through an ICGL-approved PFI. Additional eligibility requirements may vary by PFI and guarantee product.',
      },
      {
        q: 'How do I apply for an ICGL-backed loan?',
        a: "You apply through a Participating Financial Institution (PFI) — a bank or financial institution that has a guarantee agreement with ICGL. The PFI will determine whether ICGL's guarantee applies to your loan request.",
      },
      {
        q: 'What documents are required for application?',
        a: 'Required documents vary by PFI and loan type, but generally include business registration documents, valid means of identification, financial statements or records, a business plan, and any collateral documentation required by the lender.',
      },
      {
        q: 'Can foreign-owned businesses apply?',
        a: "ICGL's guarantee support is primarily targeted at Nigerian-registered MSMEs and small corporates. Foreign-owned businesses registered and operating in Nigeria may be considered case-by-case, subject to the PFI's policies.",
      },
      {
        q: 'How long does the approval process take?',
        a: "The timeline depends primarily on the PFI's internal credit assessment process. ICGL's guarantee review is typically conducted within a few business days once a complete application package is submitted.",
      },
    ],
  },
  {
    title: 'Partner Financial Institutions (PFIs)',
    items: [
      {
        q: 'What is a Partner Financial Institution (PFI)?',
        a: 'A Partner Financial Institution (PFI) is a bank, microfinance institution, or other licensed financial institution that has entered into a guarantee agreement with ICGL, and is the primary channel through which ICGL’s guarantees are deployed.',
      },
      {
        q: 'Which banks or institutions partner with ICGL?',
        a: 'ICGL partners with a growing network of commercial banks, microfinance banks, and development finance institutions across Nigeria. For the current list of approved PFIs, please contact us.',
      },
      {
        q: 'How can a financial institution become a PFI?',
        a: "Interested institutions should reach out through ICGL's official contact channels. Onboarding involves an assessment of lending capacity, compliance standing, and alignment with ICGL's eligibility and governance requirements.",
      },
      {
        q: 'Can PFIs access technical assistance?',
        a: 'Yes. In addition to credit guarantees, ICGL provides Technical Assistance to PFIs, including training, advisory support, and tools to improve MSME lending products and risk management practices.',
      },
    ],
  },
]
