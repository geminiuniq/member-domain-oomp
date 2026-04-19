const routes = {
  dashboard: {
    title: "首页 · 工作台",
    description: "跨模块待办汇总与运营状态总览",
    render: renderDashboard,
  },
  merchantList: {
    title: "商户管理 · 商户搜索",
    description: "支持模糊搜索、多条件筛选与新建商户流程",
    render: renderMerchantList,
  },
  merchantDetail: {
    title: "商户管理 · 商户详情",
    description: "核心页面：聚合商户全生命周期管理模块",
    render: renderMerchantDetail,
  },
  groupDetail: {
    title: "企业集团详情",
    description: "展示集团下所有 CustomerProfile 及商户总览",
    render: renderGroupDetail,
  },
  globalBoard: {
    title: "全局看板",
    description: "跨商户视角队列与风险预警",
    render: renderGlobalBoard,
  },
};

const merchantDetailTabs = [
  { id: "basic", label: "基本信息" },
  { id: "kyb", label: "入驻与 KYB" },
  { id: "compliance", label: "合规档案" },
  { id: "contracts", label: "合约与产品" },
  { id: "accounts", label: "账户结构" },
  { id: "members", label: "企业成员" },
];

const licenseOptions = ["HK · TCSP", "HK · MSO", "SG · DPT"];
const complianceStatusOptions = ["正常", "受限", "暂停"];
const kybStatusOptions = ["待提交", "审核中", "人工复核", "已通过", "已拒绝"];
const groupOptions = ["OOMP Holdings", "NorthBridge Group", "Vertex Capital"];
const rmOptions = ["Rachel Tan", "Leo Wong", "Mia Chen", "Arjun Singh"];
const jurisdictionOptions = ["香港", "新加坡", "英国", "阿联酋", "BVI"];
const opsApproverOptions = ["Alicia Ops", "Kevin Ops", "Tom Ops"];
const supervisorOps = [...new Set([...opsApproverOptions, "Nancy Ops"])];
const billingFeePlans = [
  { id: "FP-TCSP-V2", name: "TCSP标准 v2", version: "v2", desc: "标准收付款费率" },
  { id: "FP-TCSP-V1", name: "TCSP标准 v1", version: "v1", desc: "历史标准费率" },
  { id: "FP-EXCHANGE-V1", name: "兑换专项 v1", version: "v1", desc: "稳定币兑换费率" },
  { id: "FP-MSO-V2", name: "MSO标准 v2", version: "v2", desc: "MSO牌照产品费率" },
];
const contractProductCatalog = [
  { code: "stablecoin_collection", name: "稳定币收款", needsFeePlan: true, defaultCurrencies: ["USDT", "USDC"] },
  { code: "stablecoin_payout", name: "稳定币付款", needsFeePlan: true, defaultCurrencies: ["USDT", "USDC"] },
  { code: "stablecoin_exchange", name: "稳定币兑换", needsFeePlan: true, defaultCurrencies: ["USDT", "USDC"] },
  { code: "api_access", name: "API 接入", needsFeePlan: false, defaultCurrencies: [] },
  { code: "fiat_collection", name: "法币收款", needsFeePlan: true, defaultCurrencies: [] },
  { code: "fiat_payout", name: "法币付款", needsFeePlan: true, defaultCurrencies: [] },
];

const currentOps = "Nancy Ops";

const merchants = [
  {
    id: "M-100234",
    customerProfileId: "CP-00012345",
    name: "ABC Trading Limited",
    localName: "艾比希贸易有限公司",
    registrationNo: "12345678",
    adminEmail: "admin@abc.com",
    licenses: ["HK · TCSP", "HK · MSO"],
    complianceStatus: "正常",
    kybStatus: "审核中",
    onboardedAt: daysAgo(12),
    jurisdiction: "香港",
    enterpriseGroup: "OOMP Holdings",
    rm: "Rachel Tan",
    notes: "重点观察 UBO 变更",
  },
  {
    id: "M-100199",
    customerProfileId: "CP-00012312",
    name: "NorthBridge Supply Chain",
    localName: "",
    registrationNo: "87233419",
    adminEmail: "ops@northbridge.com",
    licenses: ["HK · TCSP"],
    complianceStatus: "正常",
    kybStatus: "已通过",
    onboardedAt: daysAgo(54),
    jurisdiction: "香港",
    enterpriseGroup: "NorthBridge Group",
    rm: "Leo Wong",
    notes: "",
  },
  {
    id: "M-100451",
    customerProfileId: "CP-00012880",
    name: "Vertex Global Services",
    localName: "维特全球服务",
    registrationNo: "55890127",
    adminEmail: "admin@vertexglobal.com",
    licenses: ["HK · MSO"],
    complianceStatus: "受限",
    kybStatus: "人工复核",
    onboardedAt: daysAgo(5),
    jurisdiction: "香港",
    enterpriseGroup: "Vertex Capital",
    rm: "Mia Chen",
    notes: "触发地址证明补件",
  },
  {
    id: "M-100316",
    customerProfileId: "CP-00012449",
    name: "Lion Crest Digital Assets",
    localName: "",
    registrationNo: "77621002",
    adminEmail: "admin@lioncrest.io",
    licenses: ["SG · DPT"],
    complianceStatus: "正常",
    kybStatus: "待提交",
    onboardedAt: daysAgo(2),
    jurisdiction: "新加坡",
    enterpriseGroup: "",
    rm: "Arjun Singh",
    notes: "已完成初次沟通",
  },
  {
    id: "M-100587",
    customerProfileId: "CP-00013001",
    name: "Harbourline Corporate",
    localName: "港线企业服务",
    registrationNo: "39100472",
    adminEmail: "admin@harbourline.co",
    licenses: ["HK · TCSP"],
    complianceStatus: "暂停",
    kybStatus: "已拒绝",
    onboardedAt: daysAgo(78),
    jurisdiction: "香港",
    enterpriseGroup: "",
    rm: "Rachel Tan",
    notes: "高风险拒绝后暂停",
  },
  {
    id: "M-100632",
    customerProfileId: "CP-00013066",
    name: "OOMP Trading Pte. Ltd.",
    localName: "",
    registrationNo: "202402991Z",
    adminEmail: "admin@oomptrading.com",
    licenses: ["SG · DPT"],
    complianceStatus: "正常",
    kybStatus: "审核中",
    onboardedAt: daysAgo(1),
    jurisdiction: "新加坡",
    enterpriseGroup: "OOMP Holdings",
    rm: "Mia Chen",
    notes: "",
  },
];

const todoTypeToMerchantTab = {
  "KYB 待审核": "kyb",
  "KYB 人工复核": "kyb",
  "文件待审核": "compliance",
  "Admin 任命待处理": "members",
  "Admin KYC 待执行": "members",
};

const workbenchTasks = [
  {
    id: "T-001",
    type: "KYB 待审核",
    merchantId: "M-100234",
    license: "SG · DPT",
    submittedAt: hoursAgo(6),
    assignee: currentOps,
  },
  {
    id: "T-002",
    type: "KYB 人工复核",
    merchantId: "M-100199",
    license: "HK · TCSP",
    submittedAt: hoursAgo(34),
    assignee: "Alicia Ops",
  },
  {
    id: "T-003",
    type: "文件待审核",
    merchantId: "M-100451",
    license: "HK · MSO",
    submittedAt: hoursAgo(58),
    assignee: null,
  },
  {
    id: "T-004",
    type: "Admin 任命待处理",
    merchantId: "M-100316",
    license: "SG · DPT",
    submittedAt: hoursAgo(10),
    assignee: currentOps,
  },
  {
    id: "T-005",
    type: "Admin KYC 待执行",
    merchantId: "M-100587",
    license: "HK · TCSP",
    submittedAt: hoursAgo(73),
    assignee: null,
  },
  {
    id: "T-006",
    type: "KYB 待审核",
    merchantId: "M-100451",
    license: "HK · MSO",
    submittedAt: hoursAgo(25),
    assignee: currentOps,
  },
];

let activeRoute = "dashboard";
let activeMerchantTab = "basic";
let selectedMerchantId = "M-100234";
let activeWorkbenchTab = "mine";
let merchantSearchInput = "";
let merchantSearchKeyword = "";
let merchantSearchTimer = null;
let merchantDrawerOpen = false;
let merchantDrawerError = "";
let pageFlashMessage = "";
let selectedGroupName = "";
let merchantProfileEditing = false;
let merchantTeamEditing = false;
let showAllInternalNotes = false;
let addLicenseDrawerOpen = false;
let addLicenseSelected = "";
let addLicenseError = "";
let kybFocusEntityId = "";
let kybExpandedForMerchantId = "";
let kybReviewEntityId = "";
let kybReviewMaterialId = "";
let kybReviewComment = "";
let kybHistoryModalEntityId = "";
let kybHistoryModalAt = "";
let complianceExpandedForMerchantId = "";
let complianceSharedExpanded = true;
let complianceSharedShowAll = false;
let complianceSharedFocus = false;
let complianceReviewEntityId = "";
let complianceReviewFileId = "";
let complianceReviewComment = "";
let complianceSharedHistoryFileId = "";
let contractsExpandedForMerchantId = "";
let contractsEditEntityId = "";
let contractsChangeDrawerEntityId = "";
let contractsChangeType = "scope";
let contractsChangeReason = "";
let contractsProductDrawerEntityId = "";
let contractsProductDrawerStep = 1;
let contractsSelectedProductCode = "";
let contractsSelectedCurrencies = new Set();
let contractsSelectedRegions = "";
let contractsSelectedFeePlanId = "";
let contractsProductManageEntityId = "";
let contractsProductManageCode = "";
let contractsFeePlanChangeDrawerEntityId = "";
let contractsFeePlanChangeProductCode = "";
let contractsFeePlanTarget = "";
let contractsFeePlanChangeReason = "";
let contractsFeePlanSecondApprover = "";
let contractsStatusReasonInput = "";
let contractsPreviewFileName = "";
let contractsPreviewAttachmentPath = "";
let accountsExpandedForMerchantId = "";
const accountsExpandedEntityIds = new Set();
const accountsSubTabByEntity = {};
const accountsWhitelistFilterByEntity = {};
let accountsManageEntityId = "";
let accountsManageAccountId = "";
let accountsPauseDrawerEntityId = "";
let accountsPauseMode = "pause";
let accountsPauseReason = "";
let accountsResumeSecondApprover = "";
let accountsAddBankDrawerEntityId = "";
let accountsAddBankName = "";
let accountsAddBankCurrency = "";
let accountsAddBankOpenDate = "";
let accountsAddBankNote = "";
let accountsAutoCreateFiat = true;
let accountsAddFiatDrawerEntityId = "";
let accountsAddFiatStep = 1;
let accountsAddFiatBankId = "";
let accountsWhitelistReviewEntityId = "";
let accountsWhitelistReviewEntryId = "";
let accountsWhitelistReviewComment = "";
let membersExpandedForMerchantId = "";
const membersExpandedEntityIds = new Set();
const membersSubTabByEntity = {};
const membersFilterByEntity = {};
const membersShowRemovedByEntity = {};
let membersDetailEntityId = "";
let membersDetailMemberId = "";
let membersAppointmentDetailEntityId = "";
let membersAppointmentDetailId = "";
let membersNewAppointmentDrawerEntityId = "";
let membersAppointeeName = "";
let membersAppointeeEmail = "";
let membersAppointeeTitle = "";
let membersAppointmentLetterName = "";
let membersAppointeeIdFileName = "";
let membersAppointmentSecondApprover = "";
let membersApiKeyDetailEntityId = "";
let membersApiKeyDetailId = "";
let adminQueueStatusTab = "all";
const adminQueueFilters = {
  license: "all",
  timePreset: "all",
  assignee: "all",
  startDate: "",
  endDate: "",
};
let adminQueuePage = 1;
const adminQueuePageSize = 6;
let adminQueueSelectedRequestKey = "";
let adminQueueKycComment = "";
let adminQueueLastUpdatedAt = new Date().toISOString();
let adminQueueAutoRefreshInstalled = false;
let globalBoardView = "docExpiry";
let docExpiryCardFilter = "all";
const docExpiryFilters = {
  fileType: "all",
  license: "all",
  level: "all",
  range: "all",
  startDate: "",
  endDate: "",
};
let docExpiryPage = 1;
const docExpiryPageSize = 8;
let docExpirySelectedKey = "";
let docExpiryNotifyChannel = "system";
let docExpiryNotifyContent = "";
let docExpiryInternalNote = "";
const docExpiryNotesByKey = {};
let docExpiryLastUpdatedAt = new Date().toISOString();
let docExpiryMidnightRefreshInstalled = false;

const addLicenseReuseDocs = new Set();
const kybExpandedEntityIds = new Set();
const kybSubTabByEntity = {};
const complianceExpandedEntityIds = new Set();
const complianceSubTabByEntity = {};
const complianceFileFilterByEntity = {};
const contractsExpandedEntityIds = new Set();
const contractsSubTabByEntity = {};
const merchantProfileDraft = {
  merchantId: "",
  localName: "",
  operatingRegion: "",
  businessDescription: "",
  enterpriseGroup: "",
};
const merchantTeamDraft = {
  merchantId: "",
  rm: "",
};

const workbenchFilters = {
  types: new Set(),
  license: "all",
  urgency: "all",
  startDate: "",
  endDate: "",
};

const merchantFilters = {
  license: "all",
  complianceStatus: "all",
  kybStatus: "all",
  datePreset: "all",
  startDate: "",
  endDate: "",
};

const merchantSort = {
  field: "onboardedAt",
  direction: "desc",
};

const newMerchantForm = {
  legalName: "",
  localName: "",
  jurisdiction: "",
  adminEmail: "",
  enterpriseGroup: "",
  targetLicenses: new Set(),
  rm: "",
  notes: "",
};

function hoursAgo(hours) {
  return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
}

function daysAgo(days) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
}

function bootstrapMerchantDetailData() {
  merchants.forEach((merchant) => {
    if (!merchant.actualOperatingRegion) {
      merchant.actualOperatingRegion = merchant.jurisdiction || "-";
    }
    if (!merchant.businessDescription) {
      merchant.businessDescription = merchant.notes || "待补充";
    }
    if (!merchant.createdAt) {
      merchant.createdAt = merchant.onboardedAt;
    }
    if (!merchant.createdBy) {
      merchant.createdBy = "System";
    }
    if (!merchant.profileAuditLogs) {
      merchant.profileAuditLogs = [];
    }
    if (!merchant.teamAuditLogs) {
      merchant.teamAuditLogs = [];
    }
    if (!merchant.internalNotes) {
      merchant.internalNotes = merchant.notes
        ? [
            {
              at: merchant.onboardedAt,
              operator: "System",
              content: merchant.notes,
            },
          ]
        : [];
    }
    if (!merchant.documentVaultMaterials) {
      merchant.documentVaultMaterials = [
        "公司注册证书",
        "商业登记证明",
        "董事名册",
        "UBO 声明",
      ];
    }
    if (!merchant.sharedComplianceFiles) {
      merchant.sharedComplianceFiles = getDefaultSharedComplianceFiles(merchant);
    }
    if (!merchant.legalEntities) {
      merchant.legalEntities = merchant.licenses.map((license, idx) => ({
        id: `CLE-${merchant.customerProfileId.replace(/\D/g, "")}-${String(idx + 1).padStart(2, "0")}`,
        licenseName: license,
        activationStatus: mapKybToActivationStatus(merchant.kybStatus),
        kybStatus: merchant.kybStatus,
      }));
    }
    merchant.legalEntities.forEach((entity, idx) => hydrateLegalEntity(merchant, entity, idx));
  });
}

function mapKybToActivationStatus(kybStatus) {
  if (kybStatus === "active") return "已激活";
  if (kybStatus === "pending") return "待提交";
  if (kybStatus === "rejected") return "已暂停";
  if (kybStatus === "已通过") return "已激活";
  if (kybStatus === "审核中" || kybStatus === "人工复核") return "KYB 进行中";
  if (kybStatus === "已拒绝") return "已暂停";
  return "待提交";
}

function getDefaultSystemChecks(entity, idx) {
  const hasPepWarning = entity.licenseName.includes("MSO") || idx % 2 === 1;
  const sanctionHit = entity.licenseName.includes("DPT") && idx > 1;
  return {
    sanction: sanctionHit ? "命中" : "通过",
    industryRisk: "通过",
    uboPep: hasPepWarning ? "发现 1 项（James Chan · 低风险）" : "通过",
    suggestion: sanctionHit ? "拒绝申请（制裁命中）" : hasPepWarning ? "人工复核（因 PEP 关联）" : "可批准",
  };
}

function getDefaultMaterialsForEntity(merchant, entity, idx) {
  const sharedPrefix = `${merchant.customerProfileId}-${entity.licenseName}`;
  const isInProgress = entity.kybStatus === "审核中" || entity.kybStatus === "人工复核";
  const bankProofStatus = isInProgress ? "待审核" : "已验证";
  const maryPassportStatus = isInProgress ? "待审核" : "已验证";

  return [
    {
      id: `${sharedPrefix}-ent-1`,
      group: "企业文件",
      label: "商业登记证",
      fileName: "BR_2025.pdf",
      attachmentPath: "./assets/attachments/sample-document.pdf",
      source: "共享",
      sharedKey: `${merchant.customerProfileId}-br`,
      status: "已验证",
      uploadedAt: daysAgo(12),
      uploadedBy: "商户自助上传",
    },
    {
      id: `${sharedPrefix}-ent-2`,
      group: "企业文件",
      label: "公司章程",
      fileName: "MOA_ABC.pdf",
      attachmentPath: "./assets/attachments/sample-document.pdf",
      source: "共享",
      sharedKey: `${merchant.customerProfileId}-moa`,
      status: "已验证",
      uploadedAt: daysAgo(11),
      uploadedBy: "商户自助上传",
    },
    {
      id: `${sharedPrefix}-ent-3`,
      group: "企业文件",
      label: "银行开户证明",
      fileName: "Bank_proof.pdf",
      attachmentPath: "./assets/attachments/sample-document.pdf",
      source: "专属",
      sharedKey: "",
      status: bankProofStatus,
      uploadedAt: daysAgo(8),
      uploadedBy: "商户自助上传",
    },
    {
      id: `${sharedPrefix}-ubo-1`,
      group: "UBO 文件",
      personName: "James Chan",
      label: "护照",
      fileName: "James_passport.pdf",
      attachmentPath: "./assets/attachments/sample-id.svg",
      source: "共享",
      sharedKey: `${merchant.customerProfileId}-james-passport`,
      status: "已验证",
      uploadedAt: daysAgo(10),
      uploadedBy: "商户自助上传",
    },
    {
      id: `${sharedPrefix}-ubo-2`,
      group: "UBO 文件",
      personName: "James Chan",
      label: "地址证明",
      fileName: "James_address.pdf",
      attachmentPath: "./assets/attachments/sample-document.pdf",
      source: "专属",
      sharedKey: "",
      status: "已验证",
      uploadedAt: daysAgo(9),
      uploadedBy: "商户自助上传",
    },
    {
      id: `${sharedPrefix}-ubo-3`,
      group: "UBO 文件",
      personName: "Mary Wong",
      label: "护照",
      fileName: "Mary_passport.pdf",
      attachmentPath: "./assets/attachments/sample-id.svg",
      source: "共享",
      sharedKey: `${merchant.customerProfileId}-mary-passport`,
      status: maryPassportStatus,
      uploadedAt: daysAgo(7),
      uploadedBy: "商户自助上传",
    },
    {
      id: `${sharedPrefix}-agr-1`,
      group: "协议文件",
      label: "服务框架协议",
      fileName: "MSA_signed.pdf",
      attachmentPath: "./assets/attachments/sample-document.pdf",
      source: "专属",
      sharedKey: "",
      status: "已签署",
      uploadedAt: daysAgo(6),
      uploadedBy: "运营代上传",
    },
    {
      id: `${sharedPrefix}-agr-2`,
      group: "协议文件",
      label: "AML确认函",
      fileName: "AML_confirm.pdf",
      attachmentPath: "./assets/attachments/sample-document.pdf",
      source: "专属",
      sharedKey: "",
      status: "已确认",
      uploadedAt: daysAgo(6),
      uploadedBy: "运营代上传",
    },
  ];
}

function getDefaultSharedComplianceFiles(merchant) {
  const base = merchant.customerProfileId;
  return [
    createComplianceFile({
      id: `SCF-${base}-01`,
      fileType: "商业登记证",
      fileName: "BR_2025.pdf",
      expiryDate: "2026-12-31",
      status: "已验证",
      attachmentPath: "./assets/attachments/sample-document.pdf",
      source: "共享",
      uploadedBy: "商户自助上传",
      uploadedAt: daysAgo(120),
    }),
    createComplianceFile({
      id: `SCF-${base}-02`,
      fileType: "公司章程",
      fileName: "MOA_ABC.pdf",
      expiryDate: "长期",
      status: "已验证",
      attachmentPath: "./assets/attachments/sample-document.pdf",
      source: "共享",
      uploadedBy: "商户自助上传",
      uploadedAt: daysAgo(180),
    }),
    createComplianceFile({
      id: `SCF-${base}-03`,
      fileType: "UBO护照·James",
      fileName: "passport_JC.pdf",
      expiryDate: "2027-03-31",
      status: "已验证",
      attachmentPath: "./assets/attachments/sample-id.svg",
      source: "共享",
      uploadedBy: "商户自助上传",
      uploadedAt: daysAgo(95),
    }),
    createComplianceFile({
      id: `SCF-${base}-04`,
      fileType: "UBO护照·Mary",
      fileName: "passport_MW.pdf",
      expiryDate: "2026-05-31",
      status: "已验证",
      attachmentPath: "./assets/attachments/sample-id.svg",
      source: "共享",
      uploadedBy: "商户自助上传",
      uploadedAt: daysAgo(88),
    }),
    createComplianceFile({
      id: `SCF-${base}-05`,
      fileType: "UBO地址证明·James",
      fileName: "address_JC.pdf",
      expiryDate: "2026-06-20",
      status: "已验证",
      attachmentPath: "./assets/attachments/sample-document.pdf",
      source: "共享",
      uploadedBy: "商户自助上传",
      uploadedAt: daysAgo(72),
    }),
    createComplianceFile({
      id: `SCF-${base}-06`,
      fileType: "股权结构图",
      fileName: "ownership_chart.pdf",
      expiryDate: "长期",
      status: "已验证",
      attachmentPath: "./assets/attachments/sample-document.pdf",
      source: "共享",
      uploadedBy: "运营代上传",
      uploadedAt: daysAgo(66),
    }),
    createComplianceFile({
      id: `SCF-${base}-07`,
      fileType: "源资金说明",
      fileName: "SOF_declaration.pdf",
      expiryDate: "长期",
      status: "已验证",
      attachmentPath: "./assets/attachments/sample-document.pdf",
      source: "共享",
      uploadedBy: "商户自助上传",
      uploadedAt: daysAgo(54),
    }),
    createComplianceFile({
      id: `SCF-${base}-08`,
      fileType: "授权代表委任书",
      fileName: "auth_rep.pdf",
      expiryDate: "长期",
      status: "已验证",
      attachmentPath: "./assets/attachments/sample-document.pdf",
      source: "共享",
      uploadedBy: "商户自助上传",
      uploadedAt: daysAgo(42),
    }),
  ];
}

function createComplianceFile(payload) {
  const now = new Date().toISOString();
  const status = payload.status || "待审核";
  const file = {
    id: payload.id || `CF-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    fileType: payload.fileType || "未分类",
    fileName: payload.fileName || "untitled.pdf",
    expiryDate: payload.expiryDate || "长期",
    status,
    source: payload.source || "专属",
    attachmentPath: payload.attachmentPath || inferAttachmentPath(payload),
    uploadedAt: payload.uploadedAt || now,
    uploadedBy: payload.uploadedBy || currentOps,
    isExpired: false,
    versions: Array.isArray(payload.versions) ? payload.versions : [],
  };
  file.isExpired = resolveComplianceFileState(file.status, file.expiryDate) === "已过期";
  return file;
}

function resolveComplianceFileState(status, expiryDate) {
  if (status === "待审核" || status === "已拒绝") return status;
  if (!expiryDate || expiryDate === "长期") return "有效";
  const expiry = new Date(`${expiryDate}T23:59:59`);
  if (Number.isNaN(expiry.getTime())) return "有效";
  const diff = expiry.getTime() - Date.now();
  const dayMs = 24 * 60 * 60 * 1000;
  if (diff < 0) return "已过期";
  if (diff <= 60 * dayMs) return "即将到期";
  return "有效";
}

function getDefaultComplianceProfile(merchant, entity, idx) {
  const nowStatus = merchant.complianceStatus === "正常" ? "正常（Active）" : merchant.complianceStatus;
  const statusReason = merchant.complianceStatus === "正常" ? "—" : "触发持续监控规则";
  const rating = idx % 2 === 0 ? "中风险" : "低风险";
  return {
    complianceStatus: nowStatus,
    statusReason,
    statusUpdatedAt: daysAgo(49),
    statusUpdatedBy: "合规风控引擎",
    riskRating: rating,
    riskReason: rating === "中风险" ? "发现 PEP 关联（James Chan · 低风险）" : "未发现新增风险信号",
    riskUpdatedAt: daysAgo(49),
    riskUpdatedBy: "合规风控引擎",
    lastReviewAt: daysAgo(49),
    lastReviewConclusion: "通过",
    nextReviewAt: new Date(new Date(daysAgo(49)).getTime() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    enableStablecoin: entity.licenseName.includes("DPT") || entity.licenseName.includes("TCSP"),
    kytScore: 35,
    kytProvider: "Chainalysis",
    kytUpdatedAt: daysAgo(9),
    hasSarFlag: entity.licenseName.includes("TCSP"),
  };
}

function getDefaultComplianceFilesForEntity(entity) {
  const lower = entity.licenseName.toLowerCase();
  const baseKey = entity.id.replace(/\s+/g, "");
  const rows = [
    createComplianceFile({
      id: `ECF-${baseKey}-01`,
      fileType: "银行开户证明",
      fileName: "bank_proof.pdf",
      expiryDate: "长期",
      status: "已验证",
      source: "专属",
      attachmentPath: "./assets/attachments/sample-document.pdf",
      uploadedAt: daysAgo(63),
      uploadedBy: "商户自助上传",
    }),
    createComplianceFile({
      id: `ECF-${baseKey}-02`,
      fileType: entity.licenseName.includes("TCSP")
        ? "TCSP牌照说明"
        : entity.licenseName.includes("MSO")
          ? "MSO牌照说明"
          : "DPT牌照说明",
      fileName: lower.includes("tcsp") ? "tcsp_decl.pdf" : lower.includes("mso") ? "mso_decl.pdf" : "dpt_decl.pdf",
      expiryDate: "长期",
      status: "已验证",
      source: "专属",
      attachmentPath: "./assets/attachments/sample-document.pdf",
      uploadedAt: daysAgo(52),
      uploadedBy: "运营代上传",
    }),
    createComplianceFile({
      id: `ECF-${baseKey}-03`,
      fileType: "稳定币业务声明",
      fileName: "stable_decl.pdf",
      expiryDate: "长期",
      status: entity.kybStatus === "审核中" || entity.kybStatus === "人工复核" ? "待审核" : "已验证",
      source: "专属",
      attachmentPath: "./assets/attachments/sample-document.pdf",
      uploadedAt: daysAgo(38),
      uploadedBy: "商户自助上传",
    }),
  ];
  return rows;
}

function getDefaultComplianceReviewHistory(entity) {
  return [
    {
      id: `RV-${entity.id}-01`,
      at: "2026-03-01T14:22:00",
      triggerType: "定期复审",
      reviewer: "合规风控引擎",
      conclusion: "通过",
      finding: "PEP 关联持续监控中，无新增风险信号",
      actionTaken: "维持中风险评级，下次复审 2027-03-01",
      completionAt: "2026-03-01T14:22:00",
    },
    {
      id: `RV-${entity.id}-02`,
      at: "2025-06-15T10:10:00",
      triggerType: "事件驱动",
      reviewer: "合规风控引擎 + Tom（人工介入）",
      conclusion: "通过",
      finding: "交易量增长符合客户业务发展预期",
      actionTaken: "继续按既有监控频率跟踪",
      completionAt: "2025-06-18T09:15:00",
    },
  ];
}

function getDefaultContractDataForEntity(entity) {
  const code = entity.licenseName.includes("TCSP") ? "TCSP" : entity.licenseName.includes("MSO") ? "MSO" : "DPT";
  const active = entity.kybStatus === "pending" ? "待签署" : "生效中";
  return {
    current: {
      contractId: `MSA-${code}-${String(entity.id).slice(-5)}`,
      version: "v2.0",
      contractType: "标准商户合约",
      signer: "James Chan（授权代表）",
      signedAt: "2025-06-01T10:22:00",
      signMethod: "DocuSign",
      effectiveDate: "2025-06-01",
      expiryDate: "长期",
      autoRenew: "否",
      status: active,
      fileName: `MSA_${code}_v2.pdf`,
      attachmentPath: "./assets/attachments/sample-document.pdf",
      scopeAuthorized: code === "TCSP" ? ["稳定币收款", "稳定币付款", "稳定币兑换", "API 接入"] : ["稳定币收款", "API 接入"],
    },
    history: [
      {
        contractId: `MSA-${code}-001`,
        version: "v1.0",
        status: "已替代",
        period: "2025-01 ~ 2025-06",
        attachmentPath: "./assets/attachments/sample-document.pdf",
      },
    ],
  };
}

function getDefaultContractProductsForEntity(entity) {
  const code = entity.licenseName.includes("TCSP") ? "TCSP" : entity.licenseName.includes("MSO") ? "MSO" : "DPT";
  const tcspProducts = [
    {
      code: "stablecoin_collection",
      name: "稳定币收款",
      currencies: ["USDT", "USDC"],
      regions: [],
      feePlanId: "FP-TCSP-V2",
      feePlanName: "TCSP标准 v2",
      status: "生效",
      activatedAt: "2025-06-01T00:00:00",
    },
    {
      code: "stablecoin_payout",
      name: "稳定币付款",
      currencies: ["USDT", "USDC"],
      regions: [],
      feePlanId: "FP-TCSP-V2",
      feePlanName: "TCSP标准 v2",
      status: "生效",
      activatedAt: "2025-06-01T00:00:00",
    },
    {
      code: "stablecoin_exchange",
      name: "稳定币兑换",
      currencies: ["USDT", "USDC"],
      regions: [],
      feePlanId: "FP-EXCHANGE-V1",
      feePlanName: "兑换专项 v1",
      status: "生效",
      activatedAt: "2025-09-01T09:00:00",
    },
    {
      code: "api_access",
      name: "API 接入",
      currencies: [],
      regions: [],
      feePlanId: "",
      feePlanName: "—",
      status: "生效",
      activatedAt: "2025-06-01T00:00:00",
    },
  ];
  if (code === "TCSP") return tcspProducts;
  if (code === "MSO") {
    return [
      {
        code: "api_access",
        name: "API 接入",
        currencies: [],
        regions: [],
        feePlanId: "",
        feePlanName: "—",
        status: "生效",
        activatedAt: "2025-08-20T00:00:00",
      },
    ];
  }
  return [];
}

function getDefaultContractChangeLogsForEntity(entity) {
  const code = entity.licenseName.includes("TCSP") ? "TCSP" : entity.licenseName.includes("MSO") ? "MSO" : "DPT";
  return [
    {
      at: "2026-04-10T10:00:00",
      actor: "Nancy",
      action: "变更 Fee Plan",
      detail: `稳定币收款：${code}标准 v1 → ${code}标准 v2`,
    },
    {
      at: "2025-09-01T09:00:00",
      actor: "Tom",
      action: "开通产品",
      detail: "稳定币兑换 · 兑换专项 v1",
    },
    {
      at: "2025-06-01T10:22:00",
      actor: "系统",
      action: "合约生效",
      detail: `MSA-${code}-00123 · v2.0 签署完成`,
    },
  ];
}

function getDefaultAccountStructureForEntity(entity, idx) {
  const licenseKey = entity.licenseName.includes("TCSP") ? "HK" : entity.licenseName.includes("MSO") ? "HK" : "SG";
  const seq = String(idx + 1).padStart(3, "0");
  return {
    unifiedAccount: {
      id: `UA-${licenseKey}-${seq}`,
      status: "正常",
      openedAt: idx % 2 === 0 ? "2025-06-01" : "2025-09-01",
      baseCurrency: licenseKey === "HK" ? "HKD" : "SGD",
      resumeRequest: null,
    },
    assetAccount: {
      id: `AA-${licenseKey}-${seq}`,
      status: "正常",
    },
    fiatAccounts: [
      {
        id: `FAC-${licenseKey}-${seq}-HKD`,
        currency: "HKD",
        virtualAccountNo: `888-${licenseKey}-${seq}-HKD`,
        provider: "DBS Bank",
        canDeposit: true,
        canWithdraw: true,
        status: "正常",
        openedAt: "2025-06-01",
        linkedBankAccountId: `CBA-${licenseKey}-${seq}-HKD`,
      },
      {
        id: `FAC-${licenseKey}-${seq}-USD`,
        currency: "USD",
        virtualAccountNo: `888-${licenseKey}-${seq}-USD`,
        provider: "DBS Bank",
        canDeposit: true,
        canWithdraw: true,
        status: "正常",
        openedAt: "2025-06-01",
        linkedBankAccountId: `CBA-${licenseKey}-${seq}-USD`,
      },
    ],
    stableAccounts: [
      {
        id: `SAC-${licenseKey}-${seq}-USDT`,
        token: "USDT",
        address: `0xAB1234EF5678CD${seq}`,
        memo: `OB-LE-${licenseKey}-${seq}`,
        minDeposit: "100 USDT",
        canDeposit: true,
        canWithdraw: true,
        status: "正常",
        openedAt: "2025-06-01",
      },
      {
        id: `SAC-${licenseKey}-${seq}-USDC`,
        token: "USDC",
        address: `0xAB1234EF5678CE${seq}`,
        memo: `OB-LE-${licenseKey}-${seq}`,
        minDeposit: "100 USDC",
        canDeposit: true,
        canWithdraw: true,
        status: "正常",
        openedAt: "2025-06-01",
      },
    ],
    bankAccounts: [
      {
        id: `CBA-${licenseKey}-${seq}-HKD`,
        bankName: "DBS HK",
        currency: "HKD",
        status: "有效",
        openedAt: "2025-06-01",
        linkedFiatAccountId: `FAC-${licenseKey}-${seq}-HKD`,
        note: "",
      },
      {
        id: `CBA-${licenseKey}-${seq}-USD`,
        bankName: "DBS HK",
        currency: "USD",
        status: "有效",
        openedAt: "2025-06-01",
        linkedFiatAccountId: `FAC-${licenseKey}-${seq}-USD`,
        note: "",
      },
      {
        id: `CBA-${licenseKey}-${seq}-EUR`,
        bankName: "HSBC HK",
        currency: "EUR",
        status: "待关联",
        openedAt: "2026-03-01",
        linkedFiatAccountId: "",
        note: "",
      },
    ],
    whitelistConfig: {
      fiatEnabled: true,
      stableEnabled: true,
      exemptAmountUsd: 5000,
    },
    whitelistEntries: [
      {
        id: `WLE-${licenseKey}-${seq}-01`,
        type: "法币",
        nameOrAddress: "James Chan · DBS HK",
        currency: "HKD",
        status: "已审核",
        accountMasked: "****1123",
        bankName: "DBS HK",
        token: "",
        address: "",
        createdAt: "2026-04-01T09:10:00",
      },
      {
        id: `WLE-${licenseKey}-${seq}-02`,
        type: "法币",
        nameOrAddress: "ABC Corp · HSBC SG",
        currency: "USD",
        status: "已审核",
        accountMasked: "****5578",
        bankName: "HSBC SG",
        token: "",
        address: "",
        createdAt: "2026-04-04T15:20:00",
      },
      {
        id: `WLE-${licenseKey}-${seq}-03`,
        type: "稳定币",
        nameOrAddress: "0xAB...CD99",
        currency: "USDT",
        status: "待审核",
        accountMasked: "",
        bankName: "",
        token: "USDT",
        address: "0xAB1234EF5678CD99",
        kytScore: 32,
        createdAt: "2026-04-10T11:45:00",
      },
      {
        id: `WLE-${licenseKey}-${seq}-04`,
        type: "稳定币",
        nameOrAddress: "0xEF...GH01",
        currency: "USDC",
        status: "已审核",
        accountMasked: "",
        bankName: "",
        token: "USDC",
        address: "0xEF9988AA7788GH01",
        kytScore: 22,
        createdAt: "2026-04-03T08:30:00",
      },
    ],
  };
}

function getDefaultMemberCenterForEntity(entity, idx) {
  const base = entity.id.replace(/[^\w]/g, "");
  const adminName = idx % 2 === 0 ? "James Chan" : "Olivia Ng";
  const adminEmail = idx % 2 === 0 ? "james@abc.com" : "olivia@merchant.com";
  return {
    groupAdmin: idx % 2 === 0
      ? {
          id: `GM-${base}-01`,
          name: "集团管理人 · Victor Group",
          email: "group.admin@holding.com",
          role: "Group Admin",
          status: "活跃",
          country: "香港",
          title: "集团财务负责人",
          joinedAt: "2025-05-01",
          lastLoginAt: "2026-04-17T12:11:00",
          crossLicense: true,
        }
      : null,
    members: [
      {
        id: `MEM-${base}-01`,
        name: adminName,
        email: adminEmail,
        role: "Admin",
        status: "活跃",
        country: "香港",
        title: "首席财务官",
        joinedAt: "2025-06-01",
        lastLoginAt: "2026-04-17T09:32:00",
        kycStatus: "已验证",
        kycVerifiedAt: "2025-05-20",
        appointmentId: `ADM-${base}-001`,
      },
      {
        id: `MEM-${base}-02`,
        name: "Mary Wong",
        email: "mary@abc.com",
        role: "Member",
        status: "活跃",
        country: "香港",
        title: "财务专员",
        joinedAt: "2025-07-01",
        lastLoginAt: "2026-04-16T14:20:00",
        roleTemplate: "财务操作员",
        permissions: [
          { page: "账户余额", scopes: "View" },
          { page: "法币提现", scopes: "View · Edit" },
          { page: "付款发起", scopes: "View · Edit · Review" },
          { page: "付款记录", scopes: "View" },
          { page: "报表导出", scopes: "View · Edit" },
        ],
      },
      {
        id: `MEM-${base}-03`,
        name: "Tom Lee",
        email: "tom@abc.com",
        role: "Member",
        status: "已邀请",
        country: "新加坡",
        title: "出纳",
        joinedAt: "2026-04-10",
        lastLoginAt: "",
        roleTemplate: "资金操作员",
        permissions: [
          { page: "付款发起", scopes: "View · Edit" },
          { page: "付款记录", scopes: "View" },
        ],
      },
      {
        id: `MEM-${base}-04`,
        name: "David Liu",
        email: "david@abc.com",
        role: "Member",
        status: "已暂停",
        country: "香港",
        title: "结算经理",
        joinedAt: "2025-08-03",
        lastLoginAt: "2026-03-18T10:40:00",
        roleTemplate: "结算专员",
        permissions: [
          { page: "法币提现", scopes: "View" },
          { page: "付款记录", scopes: "View" },
        ],
      },
      {
        id: `MEM-${base}-05`,
        name: "Archived User",
        email: "archived@abc.com",
        role: "Member",
        status: "已移除",
        country: "香港",
        title: "历史成员",
        joinedAt: "2024-09-01",
        lastLoginAt: "2025-12-01T11:00:00",
        roleTemplate: "历史模板",
        permissions: [],
      },
    ],
    appointmentRequests: [
      {
        id: `ADM-${base}-001`,
        submittedAt: "2025-05-20T10:12:00",
        status: "已完成",
        assignee: "Tom Ops",
        nomineeName: adminName,
        nomineeEmail: adminEmail,
        nomineeTitle: "首席财务官",
        nomineeRole: "Admin",
        companyLetterFile: "appointment_letter.pdf",
        idFile: "passport_admin.pdf",
        kycChecks: {
          identity: "通过",
          sanction: "通过",
          pep: "通过",
        },
        kycConclusion: "通过",
        kycComment: "材料齐全且核验通过",
        reviewedBy: "Tom Ops",
        confirmedBy: "Kevin Ops",
        completedAt: "2025-05-20T18:00:00",
      },
      {
        id: `ADM-${base}-002`,
        submittedAt: "2026-04-10T11:30:00",
        status: "KYC 进行中",
        assignee: idx % 2 === 0 ? currentOps : "Tom Ops",
        nomineeName: "Lisa Zhang",
        nomineeEmail: "lisa@abc.com",
        nomineeTitle: "财务总监",
        nomineeRole: "Admin",
        companyLetterFile: "appointment_letter_lisa.pdf",
        idFile: "passport_lisa.pdf",
        kycChecks: {
          identity: "通过",
          sanction: "通过",
          pep: "通过",
        },
        kycConclusion: "待确认",
        kycComment: "证件有效，无制裁及PEP风险",
        reviewedBy: "",
        confirmedBy: "",
        completedAt: "",
      },
      {
        id: `ADM-${base}-003`,
        submittedAt: "2026-04-16T10:30:00",
        status: "待处理",
        assignee: "",
        nomineeName: "Amy Lin",
        nomineeEmail: "amy@abc.com",
        nomineeTitle: "资金主管",
        nomineeRole: "Admin",
        companyLetterFile: "appointment_amy.pdf",
        idFile: "passport_amy.pdf",
        kycChecks: {
          identity: "待核验",
          sanction: "通过",
          pep: "通过",
        },
        kycConclusion: "",
        kycComment: "",
        reviewedBy: "",
        confirmedBy: "",
        completedAt: "",
      },
    ],
    apiKeys: [
      {
        id: `KEY-${base}-01`,
        name: "主要接入 Key",
        env: "生产环境",
        creator: adminName,
        status: "有效",
        keyPrefix: "sk_live_AB12...",
        createdAt: "2025-06-15T10:00:00",
        lastUsedAt: "2026-04-17T08:45:00",
        expiryAt: "长期",
        ipWhitelist: ["192.168.1.1", "10.0.0.1"],
        scopes: [
          { name: "稳定币收款", enabled: true },
          { name: "稳定币付款", enabled: true },
          { name: "账户查询", enabled: true },
          { name: "法币提现", enabled: false },
        ],
      },
      {
        id: `KEY-${base}-02`,
        name: "测试用 Key",
        env: "沙盒环境",
        creator: "Mary Wong",
        status: "有效",
        keyPrefix: "sk_test_XY98...",
        createdAt: "2025-09-15T09:20:00",
        lastUsedAt: "2026-04-15T18:01:00",
        expiryAt: "长期",
        ipWhitelist: ["172.16.0.1"],
        scopes: [
          { name: "稳定币收款", enabled: true },
          { name: "稳定币付款", enabled: false },
          { name: "账户查询", enabled: true },
          { name: "法币提现", enabled: false },
        ],
      },
      {
        id: `KEY-${base}-03`,
        name: "旧版 Key",
        env: "生产环境",
        creator: adminName,
        status: "已吊销",
        keyPrefix: "sk_live_OLD9...",
        createdAt: "2024-12-05T10:00:00",
        lastUsedAt: "2025-11-17T13:00:00",
        expiryAt: "长期",
        ipWhitelist: ["192.168.1.20"],
        scopes: [
          { name: "稳定币收款", enabled: true },
          { name: "稳定币付款", enabled: true },
        ],
      },
    ],
  };
}

function getDefaultHistoryForEntity(entity) {
  return [
    {
      at: daysAgo(1),
      actor: "系统",
      action: "人工复核建议",
      detail: "原因：发现 PEP 关联（James Chan）",
      context: {
        source: "系统规则引擎",
      },
      changes: [
        {
          field: "系统建议",
          before: "可批准",
          after: "人工复核",
        },
      ],
    },
    {
      at: daysAgo(2),
      actor: "Tom",
      action: "文件审核通过（银行开户证明）",
      detail: "",
      context: {
        materialLabel: "银行开户证明",
        materialSource: "专属",
      },
      changes: [
        {
          field: "材料状态",
          before: "待审核",
          after: "已验证",
        },
      ],
    },
    {
      at: daysAgo(3),
      actor: "商户",
      action: "提交 KYB 申请",
      detail: "",
      context: {
        source: "商户自助门户",
      },
      changes: [
        {
          field: "kyb_status",
          before: "pending",
          after: "审核中",
        },
      ],
    },
  ];
}

function hydrateLegalEntity(merchant, entity, idx) {
  if (!entity.kybStatus) {
    entity.kybStatus = merchant.kybStatus || "pending";
  }
  if (!entity.activationStatus) {
    entity.activationStatus = mapKybToActivationStatus(entity.kybStatus);
  }
  if (!entity.adminActivationStatus) {
    entity.adminActivationStatus = idx % 3 === 0 ? "未发送" : idx % 3 === 1 ? "已发送待激活" : "已激活";
  }
  if (!entity.adminActivationSentAt) {
    entity.adminActivationSentAt = daysAgo(3 + idx);
  }
  if (!entity.productScope) {
    entity.productScope = "收款 + 结算";
  }
  if (!entity.feePlan) {
    entity.feePlan = idx % 2 === 0 ? "Standard HK Plan" : "Growth Plan";
  }
  if (!entity.systemChecks) {
    entity.systemChecks = getDefaultSystemChecks(entity, idx);
  }
  if (!entity.materials) {
    entity.materials = getDefaultMaterialsForEntity(merchant, entity, idx);
  }
  entity.materials.forEach((item) => {
    if (!item.attachmentPath) {
      item.attachmentPath = inferAttachmentPath(item);
    }
  });
  if (!entity.history) {
    entity.history = getDefaultHistoryForEntity(entity);
  }
  entity.history = normalizeEntityHistory(entity.history);
  if (!entity.decisionDraft) {
    entity.decisionDraft = {
      manualComment: "",
      riskRating: "中风险",
      rejectReason: "",
      secondApprover: "",
      approvalRequest: null,
    };
  }
  if (!entity.complianceProfile) {
    entity.complianceProfile = getDefaultComplianceProfile(merchant, entity, idx);
  }
  if (!entity.complianceFiles) {
    entity.complianceFiles = getDefaultComplianceFilesForEntity(entity);
  }
  if (!entity.complianceReviewHistory) {
    entity.complianceReviewHistory = getDefaultComplianceReviewHistory(entity);
  }
  if (!entity.contractData) {
    entity.contractData = getDefaultContractDataForEntity(entity);
  }
  if (!entity.contractProducts) {
    entity.contractProducts = getDefaultContractProductsForEntity(entity);
  }
  if (!entity.contractChangeLogs) {
    entity.contractChangeLogs = getDefaultContractChangeLogsForEntity(entity);
  }
  if (!entity.accountStructure) {
    entity.accountStructure = getDefaultAccountStructureForEntity(entity, idx);
  }
  if (!entity.memberCenter) {
    entity.memberCenter = getDefaultMemberCenterForEntity(entity, idx);
  }
  if (!complianceSubTabByEntity[entity.id]) complianceSubTabByEntity[entity.id] = "overview";
  if (!complianceFileFilterByEntity[entity.id]) {
    complianceFileFilterByEntity[entity.id] = { fileType: "all", status: "all" };
  }
  if (!contractsSubTabByEntity[entity.id]) contractsSubTabByEntity[entity.id] = "contract";
  if (!accountsSubTabByEntity[entity.id]) accountsSubTabByEntity[entity.id] = "assets";
  if (!accountsWhitelistFilterByEntity[entity.id]) {
    accountsWhitelistFilterByEntity[entity.id] = { type: "all", status: "all" };
  }
  if (!membersSubTabByEntity[entity.id]) membersSubTabByEntity[entity.id] = "members";
  if (!membersFilterByEntity[entity.id]) {
    membersFilterByEntity[entity.id] = { role: "all", status: "all", country: "all" };
  }
  if (typeof membersShowRemovedByEntity[entity.id] === "undefined") {
    membersShowRemovedByEntity[entity.id] = false;
  }
}

function inferAttachmentPath(material) {
  const lower = String(material.fileName || "").toLowerCase();
  if (lower.endsWith(".svg") || lower.endsWith(".png") || lower.endsWith(".jpg") || lower.endsWith(".jpeg")) {
    return "./assets/attachments/sample-id.svg";
  }
  return "./assets/attachments/sample-document.pdf";
}

function normalizeEntityHistory(historyList) {
  if (!Array.isArray(historyList)) return [];
  return historyList.map((record, idx) => ({
    id: record.id || `H-${String(idx + 1).padStart(4, "0")}-${Math.random().toString(36).slice(2, 7)}`,
    at: record.at || new Date().toISOString(),
    actor: record.actor || "系统",
    action: record.action || "记录更新",
    detail: record.detail || "",
    context: record.context || {},
    changes: Array.isArray(record.changes) ? record.changes : [],
  }));
}

function createEntityHistoryRecord(payload) {
  return {
    id: `H-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    at: payload.at || new Date().toISOString(),
    actor: payload.actor || currentOps,
    action: payload.action || "记录更新",
    detail: payload.detail || "",
    context: payload.context || {},
    changes: Array.isArray(payload.changes) ? payload.changes : [],
  };
}

let realtimeComplianceListenerInstalled = false;
function installRealtimeComplianceListener() {
  if (realtimeComplianceListenerInstalled) return;
  realtimeComplianceListenerInstalled = true;

  window.addEventListener("compliance-status-updated", (event) => {
    const detail = event.detail || {};
    const merchant = merchants.find((item) => item.id === detail.merchantId);
    if (!merchant || !detail.status) return;
    merchant.complianceStatus = detail.status;
    if (activeRoute === "merchantDetail" && selectedMerchantId === detail.merchantId) {
      renderApp();
    }
  });
}

function getHashRoute() {
  const hash = window.location.hash.replace("#", "");
  return routes[hash] ? hash : "dashboard";
}

function setRoute(route) {
  window.location.hash = route;
}

bootstrapMerchantDetailData();

function renderApp() {
  activeRoute = getHashRoute();
  const routeConfig = routes[activeRoute];

  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="brand">Admin Portal</div>

        <div class="nav-group-title">首页</div>
        <a href="#dashboard" class="nav-link ${activeRoute === "dashboard" ? "active" : ""}">工作台</a>

        <div class="nav-group-title">商户管理</div>
        <a href="#merchantList" class="nav-link ${activeRoute === "merchantList" ? "active" : ""}">商户搜索</a>

        <div class="nav-group-title">跨商户视角</div>
        <a href="#globalBoard" class="nav-link ${activeRoute === "globalBoard" ? "active" : ""}">全局看板</a>
      </aside>

      <main class="main">
        <section class="topbar">
          <div>
            <h1>${routeConfig.title}</h1>
            <p>${routeConfig.description}</p>
          </div>
          <span class="badge">Framework v2</span>
        </section>

        ${
          pageFlashMessage
            ? `<div class="flash-banner">${pageFlashMessage}<button class="flash-close" id="dismiss-flash">关闭</button></div>`
            : ""
        }

        <section id="page"></section>
      </main>
    </div>
  `;

  const page = document.getElementById("page");
  routeConfig.render(page);

  bindActions();
}

function bindActions() {
  const dismissFlash = document.getElementById("dismiss-flash");
  if (dismissFlash) {
    dismissFlash.addEventListener("click", () => {
      pageFlashMessage = "";
      renderApp();
    });
  }

  document.querySelectorAll("[data-tab]").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeMerchantTab = btn.dataset.tab;
      renderApp();
    });
  });

  document.querySelectorAll("[data-workbench-tab]").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeWorkbenchTab = btn.dataset.workbenchTab;
      renderApp();
    });
  });

  document.querySelectorAll("[data-filter-type]").forEach((box) => {
    box.addEventListener("change", () => {
      const type = box.dataset.filterType;
      if (box.checked) {
        workbenchFilters.types.add(type);
      } else {
        workbenchFilters.types.delete(type);
      }
      renderApp();
    });
  });

  const licenseFilter = document.getElementById("filter-license");
  if (licenseFilter) {
    licenseFilter.addEventListener("change", () => {
      workbenchFilters.license = licenseFilter.value;
      renderApp();
    });
  }

  const urgencyFilter = document.getElementById("filter-urgency");
  if (urgencyFilter) {
    urgencyFilter.addEventListener("change", () => {
      workbenchFilters.urgency = urgencyFilter.value;
      renderApp();
    });
  }

  const startDate = document.getElementById("filter-start-date");
  if (startDate) {
    startDate.addEventListener("change", () => {
      workbenchFilters.startDate = startDate.value;
      renderApp();
    });
  }

  const endDate = document.getElementById("filter-end-date");
  if (endDate) {
    endDate.addEventListener("change", () => {
      workbenchFilters.endDate = endDate.value;
      renderApp();
    });
  }

  const resetFilters = document.getElementById("reset-filters");
  if (resetFilters) {
    resetFilters.addEventListener("click", () => {
      workbenchFilters.types.clear();
      workbenchFilters.license = "all";
      workbenchFilters.urgency = "all";
      workbenchFilters.startDate = "";
      workbenchFilters.endDate = "";
      renderApp();
    });
  }

  document.querySelectorAll("[data-open-task]").forEach((button) => {
    button.addEventListener("click", () => {
      const taskId = button.dataset.openTask;
      openTaskInMerchantDetail(taskId);
    });
  });

  document.querySelectorAll("[data-open-merchant]").forEach((link) => {
    link.addEventListener("click", () => {
      const taskId = link.dataset.openMerchant;
      openTaskInMerchantDetail(taskId);
    });
  });

  document.querySelectorAll("[data-open-merchant-detail]").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedMerchantId = btn.dataset.openMerchantDetail;
      activeMerchantTab = "basic";
      merchantProfileEditing = false;
      merchantTeamEditing = false;
      showAllInternalNotes = false;
      addLicenseDrawerOpen = false;
      kybFocusEntityId = "";
      setRoute("merchantDetail");
    });
  });

  document.querySelectorAll("[data-open-merchant-members]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.openMerchantMembers || "";
      const item = findAdminQueueItemByKey(key);
      if (!item) return;
      selectedMerchantId = item.merchant.id;
      activeMerchantTab = "members";
      membersExpandedEntityIds.add(item.entity.id);
      membersSubTabByEntity[item.entity.id] = "appointments";
      membersAppointmentDetailEntityId = item.entity.id;
      membersAppointmentDetailId = item.request.id;
      setRoute("merchantDetail");
    });
  });

  document.querySelectorAll("[data-adminq-card]").forEach((btn) => {
    btn.addEventListener("click", () => {
      adminQueueStatusTab = btn.dataset.adminqCard || "all";
      adminQueuePage = 1;
      renderApp();
    });
  });

  const adminQLicense = document.querySelector("[data-adminq-filter-license]");
  if (adminQLicense) {
    adminQLicense.addEventListener("change", () => {
      adminQueueFilters.license = adminQLicense.value;
      adminQueuePage = 1;
      renderApp();
    });
  }

  const adminQTime = document.querySelector("[data-adminq-filter-time]");
  if (adminQTime) {
    adminQTime.addEventListener("change", () => {
      adminQueueFilters.timePreset = adminQTime.value;
      if (adminQTime.value !== "custom") {
        adminQueueFilters.startDate = "";
        adminQueueFilters.endDate = "";
      }
      adminQueuePage = 1;
      renderApp();
    });
  }

  const adminQAssignee = document.querySelector("[data-adminq-filter-assignee]");
  if (adminQAssignee) {
    adminQAssignee.addEventListener("change", () => {
      adminQueueFilters.assignee = adminQAssignee.value;
      adminQueuePage = 1;
      renderApp();
    });
  }

  const adminQStart = document.querySelector("[data-adminq-start-date]");
  if (adminQStart) {
    adminQStart.addEventListener("change", () => {
      adminQueueFilters.startDate = adminQStart.value;
      adminQueuePage = 1;
      renderApp();
    });
  }
  const adminQEnd = document.querySelector("[data-adminq-end-date]");
  if (adminQEnd) {
    adminQEnd.addEventListener("change", () => {
      adminQueueFilters.endDate = adminQEnd.value;
      adminQueuePage = 1;
      renderApp();
    });
  }

  const adminQClearDates = document.querySelector("[data-adminq-clear-dates]");
  if (adminQClearDates) {
    adminQClearDates.addEventListener("click", () => {
      adminQueueFilters.startDate = "";
      adminQueueFilters.endDate = "";
      if (adminQueueFilters.timePreset === "custom") adminQueueFilters.timePreset = "all";
      renderApp();
    });
  }

  const adminQRefresh = document.querySelector("[data-adminq-refresh]");
  if (adminQRefresh) {
    adminQRefresh.addEventListener("click", () => {
      touchAdminQueueTimestamp();
      pageFlashMessage = "队列已手动刷新。";
      renderApp();
    });
  }

  document.querySelectorAll("[data-adminq-page]").forEach((btn) => {
    btn.addEventListener("click", () => {
      adminQueuePage = Number(btn.dataset.adminqPage || 1);
      renderApp();
    });
  });

  document.querySelectorAll("[data-adminq-open]").forEach((btn) => {
    btn.addEventListener("click", () => {
      adminQueueSelectedRequestKey = btn.dataset.requestKey || "";
      const selected = findAdminQueueItemByKey(adminQueueSelectedRequestKey);
      adminQueueKycComment = selected?.request.kycComment || "";
      renderApp();
    });
  });

  const adminQComment = document.querySelector("[data-adminq-kyc-comment]");
  if (adminQComment) {
    adminQComment.addEventListener("input", () => {
      adminQueueKycComment = adminQComment.value;
    });
  }

  document.querySelectorAll("[data-adminq-start]").forEach((btn) => {
    btn.addEventListener("click", () => {
      startAdminQueueRequest(btn.dataset.requestKey || "");
    });
  });

  document.querySelectorAll("[data-adminq-check-pass]").forEach((btn) => {
    btn.addEventListener("click", () => {
      updateAdminQueueCheck(btn.dataset.requestKey || "", btn.dataset.checkKey || "", true);
    });
  });

  document.querySelectorAll("[data-adminq-check-reject]").forEach((btn) => {
    btn.addEventListener("click", () => {
      updateAdminQueueCheck(btn.dataset.requestKey || "", btn.dataset.checkKey || "", false);
    });
  });

  document.querySelectorAll("[data-adminq-kyc-pass]").forEach((btn) => {
    btn.addEventListener("click", () => {
      submitAdminQueueKycConclusion(btn.dataset.requestKey || "", true);
    });
  });

  document.querySelectorAll("[data-adminq-kyc-reject]").forEach((btn) => {
    btn.addEventListener("click", () => {
      submitAdminQueueKycConclusion(btn.dataset.requestKey || "", false);
    });
  });

  document.querySelectorAll("[data-adminq-final-confirm]").forEach((btn) => {
    btn.addEventListener("click", () => {
      finalizeAdminAppointment(btn.dataset.requestKey || "", true);
    });
  });

  document.querySelectorAll("[data-adminq-final-reject]").forEach((btn) => {
    btn.addEventListener("click", () => {
      finalizeAdminAppointment(btn.dataset.requestKey || "", false);
    });
  });

  document.querySelectorAll("[data-globalboard-view]").forEach((btn) => {
    btn.addEventListener("click", () => {
      globalBoardView = btn.dataset.globalboardView || "adminQueue";
      renderApp();
    });
  });

  document.querySelectorAll("[data-docexp-card]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = btn.dataset.docexpCard || "all";
      docExpiryCardFilter = docExpiryCardFilter === next ? "all" : next;
      docExpiryPage = 1;
      renderApp();
    });
  });

  const docexpFileType = document.querySelector("[data-docexp-filetype]");
  if (docexpFileType) {
    docexpFileType.addEventListener("change", () => {
      docExpiryFilters.fileType = docexpFileType.value;
      docExpiryPage = 1;
      renderApp();
    });
  }

  const docexpLicense = document.querySelector("[data-docexp-license]");
  if (docexpLicense) {
    docexpLicense.addEventListener("change", () => {
      docExpiryFilters.license = docexpLicense.value;
      docExpiryPage = 1;
      renderApp();
    });
  }

  const docexpLevel = document.querySelector("[data-docexp-level]");
  if (docexpLevel) {
    docexpLevel.addEventListener("change", () => {
      docExpiryFilters.level = docexpLevel.value;
      docExpiryPage = 1;
      renderApp();
    });
  }

  const docexpRange = document.querySelector("[data-docexp-range]");
  if (docexpRange) {
    docexpRange.addEventListener("change", () => {
      docExpiryFilters.range = docexpRange.value;
      if (docExpiryFilters.range !== "custom") {
        docExpiryFilters.startDate = "";
        docExpiryFilters.endDate = "";
      }
      docExpiryPage = 1;
      renderApp();
    });
  }

  const docexpStart = document.querySelector("[data-docexp-start]");
  if (docexpStart) {
    docexpStart.addEventListener("change", () => {
      docExpiryFilters.startDate = docexpStart.value;
      docExpiryPage = 1;
      renderApp();
    });
  }

  const docexpEnd = document.querySelector("[data-docexp-end]");
  if (docexpEnd) {
    docexpEnd.addEventListener("change", () => {
      docExpiryFilters.endDate = docexpEnd.value;
      docExpiryPage = 1;
      renderApp();
    });
  }

  const docexpClearRange = document.querySelector("[data-docexp-clear-range]");
  if (docexpClearRange) {
    docexpClearRange.addEventListener("click", () => {
      docExpiryFilters.startDate = "";
      docExpiryFilters.endDate = "";
      if (docExpiryFilters.range === "custom") docExpiryFilters.range = "all";
      renderApp();
    });
  }

  document.querySelectorAll("[data-docexp-page]").forEach((btn) => {
    btn.addEventListener("click", () => {
      docExpiryPage = Number(btn.dataset.docexpPage || 1);
      renderApp();
    });
  });

  document.querySelectorAll("[data-docexp-open-panel]").forEach((btn) => {
    btn.addEventListener("click", () => {
      docExpirySelectedKey = btn.dataset.rowKey || "";
      const row = findDocumentExpiryRowByKey(docExpirySelectedKey);
      docExpiryNotifyContent = row ? getDefaultNotifyTemplate(row) : "";
      docExpiryInternalNote = "";
      renderApp();
    });
  });

  document.querySelectorAll("[data-docexp-open-merchant]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.docexpOpenMerchant || "";
      const row = findDocumentExpiryRowByKey(key);
      if (!row) return;
      selectedMerchantId = row.merchant.id;
      activeMerchantTab = "compliance";
      complianceExpandedEntityIds.add(row.entity.id);
      complianceSubTabByEntity[row.entity.id] = "files";
      complianceReviewEntityId = row.level === "共享" ? "shared" : row.entity.id;
      complianceReviewFileId = row.file.id;
      setRoute("merchantDetail");
    });
  });

  const docexpNotifyChannel = document.querySelector("[data-docexp-notify-channel]");
  if (docexpNotifyChannel) {
    docexpNotifyChannel.addEventListener("change", () => {
      docExpiryNotifyChannel = docexpNotifyChannel.value;
    });
  }

  const docexpNotifyContent = document.querySelector("[data-docexp-notify-content]");
  if (docexpNotifyContent) {
    docexpNotifyContent.addEventListener("input", () => {
      docExpiryNotifyContent = docexpNotifyContent.value;
    });
  }

  document.querySelectorAll("[data-docexp-send-notify]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const row = findDocumentExpiryRowByKey(btn.dataset.rowKey || "");
      if (!row) return;
      const content = (docExpiryNotifyContent || "").trim();
      if (!content) {
        pageFlashMessage = "请填写通知内容。";
        renderApp();
        return;
      }
      appendDocExpiryNote(row.key, `已发送${docExpiryNotifyChannel}通知：${content}`);
      docExpiryLastUpdatedAt = new Date().toISOString();
      pageFlashMessage = "更新通知已发送给商户。";
      renderApp();
    });
  });

  const docexpNote = document.querySelector("[data-docexp-note]");
  if (docexpNote) {
    docexpNote.addEventListener("input", () => {
      docExpiryInternalNote = docexpNote.value;
    });
  }

  document.querySelectorAll("[data-docexp-add-note]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const row = findDocumentExpiryRowByKey(btn.dataset.rowKey || "");
      if (!row) return;
      if (!docExpiryInternalNote.trim()) return;
      appendDocExpiryNote(row.key, docExpiryInternalNote.trim());
      docExpiryInternalNote = "";
      pageFlashMessage = "内部备注已添加。";
      renderApp();
    });
  });

  document.querySelectorAll("[data-docexp-go-review]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const row = findDocumentExpiryRowByKey(btn.dataset.rowKey || "");
      if (!row) return;
      if (row.file.status !== "待审核") return;
      selectedMerchantId = row.merchant.id;
      activeMerchantTab = "compliance";
      complianceExpandedEntityIds.add(row.entity.id);
      complianceSubTabByEntity[row.entity.id] = "files";
      complianceReviewEntityId = row.level === "共享" ? "shared" : row.entity.id;
      complianceReviewFileId = row.file.id;
      setRoute("merchantDetail");
    });
  });

  const docexpRefresh = document.querySelector("[data-docexp-refresh]");
  if (docexpRefresh) {
    docexpRefresh.addEventListener("click", () => {
      docExpiryLastUpdatedAt = new Date().toISOString();
      pageFlashMessage = "证件到期看板已刷新。";
      renderApp();
    });
  }

  const docexpExport = document.querySelector("[data-docexp-export]");
  if (docexpExport) {
    docexpExport.addEventListener("click", () => {
      exportDocumentExpiryCsv(getFilteredDocumentExpiryRows());
      pageFlashMessage = "CSV 已按当前筛选条件导出。";
      renderApp();
    });
  }

  document.querySelectorAll("[data-select-merchant]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedMerchantId = button.dataset.selectMerchant;
      merchantProfileEditing = false;
      merchantTeamEditing = false;
      showAllInternalNotes = false;
      addLicenseDrawerOpen = false;
      kybFocusEntityId = "";
      renderApp();
    });
  });

  const backMerchantListBtn = document.querySelector("[data-back-merchant-list]");
  if (backMerchantListBtn) {
    backMerchantListBtn.addEventListener("click", () => {
      setRoute("merchantList");
    });
  }

  const profileEditBtn = document.getElementById("profile-edit-btn");
  if (profileEditBtn) {
    profileEditBtn.addEventListener("click", () => {
      merchantProfileEditing = true;
      renderApp();
    });
  }

  const profileCancelBtn = document.getElementById("profile-cancel-btn");
  if (profileCancelBtn) {
    profileCancelBtn.addEventListener("click", () => {
      merchantProfileEditing = false;
      renderApp();
    });
  }

  const profileSaveBtn = document.getElementById("profile-save-btn");
  if (profileSaveBtn) {
    profileSaveBtn.addEventListener("click", () => {
      saveMerchantProfile();
    });
  }

  const profileFieldIds = [
    "profile-local-name",
    "profile-operating-region",
    "profile-business-description",
    "profile-enterprise-group",
  ];
  profileFieldIds.forEach((id) => {
    const field = document.getElementById(id);
    if (!field) return;
    field.addEventListener("input", () => {
      if (id === "profile-local-name") merchantProfileDraft.localName = field.value;
      if (id === "profile-operating-region") merchantProfileDraft.operatingRegion = field.value;
      if (id === "profile-business-description") merchantProfileDraft.businessDescription = field.value;
      if (id === "profile-enterprise-group") merchantProfileDraft.enterpriseGroup = field.value;
    });
  });

  const groupJump = document.getElementById("group-jump-btn");
  if (groupJump) {
    groupJump.addEventListener("click", () => {
      selectedGroupName = groupJump.dataset.groupName || "";
      setRoute("groupDetail");
    });
  }

  document.querySelectorAll("[data-license-jump]").forEach((btn) => {
    btn.addEventListener("click", () => {
      kybFocusEntityId = btn.dataset.licenseJump || "";
      activeMerchantTab = "kyb";
      if (kybFocusEntityId) kybExpandedEntityIds.add(kybFocusEntityId);
      renderApp();
    });
  });

  document.querySelectorAll("[data-kyb-entity-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const entityId = btn.dataset.kybEntityToggle;
      if (!entityId) return;
      if (kybExpandedEntityIds.has(entityId)) kybExpandedEntityIds.delete(entityId);
      else kybExpandedEntityIds.add(entityId);
      renderApp();
    });
  });

  document.querySelectorAll("[data-kyb-subtab]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const entityId = btn.dataset.entityId;
      const tabId = btn.dataset.kybSubtab;
      if (!entityId || !tabId) return;
      kybSubTabByEntity[entityId] = tabId;
      renderApp();
    });
  });

  document.querySelectorAll("[data-open-history-record]").forEach((btn) => {
    btn.addEventListener("click", () => {
      kybHistoryModalEntityId = btn.dataset.entityId || "";
      kybHistoryModalAt = btn.dataset.historyAt || "";
      renderApp();
    });
  });

  const closeHistoryModal = document.getElementById("close-history-modal");
  if (closeHistoryModal) {
    closeHistoryModal.addEventListener("click", () => {
      kybHistoryModalEntityId = "";
      kybHistoryModalAt = "";
      renderApp();
    });
  }

  const historyModalMask = document.getElementById("history-modal-mask");
  if (historyModalMask) {
    historyModalMask.addEventListener("click", () => {
      kybHistoryModalEntityId = "";
      kybHistoryModalAt = "";
      renderApp();
    });
  }

  document.querySelectorAll("[data-kyb-config-scope]").forEach((field) => {
    field.addEventListener("input", () => {
      const entity = getEntityById(field.dataset.entityId);
      if (!entity) return;
      entity.productScope = field.value;
    });
  });

  document.querySelectorAll("[data-kyb-config-fee]").forEach((field) => {
    field.addEventListener("input", () => {
      const entity = getEntityById(field.dataset.entityId);
      if (!entity) return;
      entity.feePlan = field.value;
    });
  });

  document.querySelectorAll("[data-resend-activation]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const entity = getEntityById(btn.dataset.entityId);
      if (!entity) return;
      const previousStatus = entity.adminActivationStatus;
      const previousSentAt = entity.adminActivationSentAt ? formatExactTime(entity.adminActivationSentAt) : "未发送";
      entity.adminActivationStatus = "已发送待激活";
      entity.adminActivationSentAt = new Date().toISOString();
      entity.history.unshift(
        createEntityHistoryRecord({
          actor: currentOps,
          action: "重新发送激活邮件",
          detail: `对象：${entity.licenseName}`,
          context: {
            source: "Ops 手动触发",
            entityId: entity.id,
          },
          changes: [
            {
              field: "Admin 激活状态",
              before: previousStatus || "未发送",
              after: entity.adminActivationStatus,
            },
            {
              field: "激活邮件发送时间",
              before: previousSentAt,
              after: formatExactTime(entity.adminActivationSentAt),
            },
          ],
        })
      );
      pageFlashMessage = "已重新发送 Admin 激活邮件。";
      renderApp();
    });
  });

  document.querySelectorAll("[data-material-review]").forEach((btn) => {
    btn.addEventListener("click", () => {
      kybReviewEntityId = btn.dataset.entityId || "";
      kybReviewMaterialId = btn.dataset.materialReview || "";
      kybReviewComment = "";
      renderApp();
    });
  });

  document.querySelectorAll("[data-kyb-review-comment]").forEach((field) => {
    field.addEventListener("input", () => {
      kybReviewComment = field.value;
    });
  });

  document.querySelectorAll("[data-kyb-review-approve]").forEach((btn) => {
    btn.addEventListener("click", () => {
      updateMaterialReviewStatus("通过");
    });
  });

  document.querySelectorAll("[data-kyb-review-reject]").forEach((btn) => {
    btn.addEventListener("click", () => {
      updateMaterialReviewStatus("拒绝");
    });
  });

  document.querySelectorAll("[data-kyb-decision-comment]").forEach((field) => {
    field.addEventListener("input", () => {
      const entity = getEntityById(field.dataset.entityId);
      if (!entity) return;
      entity.decisionDraft.manualComment = field.value;
    });
  });

  document.querySelectorAll("[data-kyb-risk-rating]").forEach((field) => {
    field.addEventListener("change", () => {
      const entity = getEntityById(field.dataset.entityId);
      if (!entity) return;
      entity.decisionDraft.riskRating = field.value;
    });
  });

  document.querySelectorAll("[data-kyb-reject-reason]").forEach((field) => {
    field.addEventListener("input", () => {
      const entity = getEntityById(field.dataset.entityId);
      if (!entity) return;
      entity.decisionDraft.rejectReason = field.value;
    });
  });

  document.querySelectorAll("[data-kyb-decision-reject]").forEach((btn) => {
    btn.addEventListener("click", () => {
      rejectEntityKyb(btn.dataset.entityId || "");
    });
  });

  document.querySelectorAll("[data-kyb-decision-approve]").forEach((btn) => {
    btn.addEventListener("click", () => {
      submitEntityApproval(btn.dataset.entityId || "");
    });
  });

  document.querySelectorAll("[data-kyb-second-approver]").forEach((field) => {
    field.addEventListener("change", () => {
      const entity = getEntityById(field.dataset.entityId);
      if (!entity) return;
      entity.decisionDraft.secondApprover = field.value;
    });
  });

  document.querySelectorAll("[data-kyb-confirm-approval]").forEach((btn) => {
    btn.addEventListener("click", () => {
      confirmEntityApproval(btn.dataset.entityId || "");
    });
  });

  document.querySelectorAll("[data-compliance-jump-shared]").forEach((btn) => {
    btn.addEventListener("click", () => {
      complianceSharedExpanded = true;
      complianceSharedFocus = true;
      const target = document.getElementById("compliance-shared-vault");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        renderApp();
      }
    });
  });

  document.querySelectorAll("[data-compliance-entity-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const entityId = btn.dataset.complianceEntityToggle;
      if (!entityId) return;
      if (complianceExpandedEntityIds.has(entityId)) {
        complianceExpandedEntityIds.delete(entityId);
      } else {
        complianceExpandedEntityIds.add(entityId);
      }
      renderApp();
    });
  });

  document.querySelectorAll("[data-compliance-subtab]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const entityId = btn.dataset.entityId;
      const tabId = btn.dataset.complianceSubtab;
      if (!entityId || !tabId) return;
      complianceSubTabByEntity[entityId] = tabId;
      renderApp();
    });
  });

  const complianceToggleAll = document.querySelector("[data-compliance-shared-toggle-all]");
  if (complianceToggleAll) {
    complianceToggleAll.addEventListener("click", () => {
      complianceSharedShowAll = !complianceSharedShowAll;
      renderApp();
    });
  }

  document.querySelectorAll("[data-compliance-toggle-history]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const fileId = btn.dataset.complianceToggleHistory || "";
      complianceSharedHistoryFileId = complianceSharedHistoryFileId === fileId ? "" : fileId;
      renderApp();
    });
  });

  const uploadSharedBtn = document.querySelector("[data-compliance-upload-shared]");
  if (uploadSharedBtn) {
    uploadSharedBtn.addEventListener("click", () => {
      uploadSharedComplianceFile();
    });
  }

  document.querySelectorAll("[data-compliance-upload-exclusive]").forEach((btn) => {
    btn.addEventListener("click", () => {
      uploadExclusiveComplianceFile(btn.dataset.complianceUploadExclusive || "");
    });
  });

  document.querySelectorAll("[data-compliance-open-file]").forEach((btn) => {
    btn.addEventListener("click", () => {
      complianceReviewEntityId = btn.dataset.complianceSource || "";
      complianceReviewFileId = btn.dataset.complianceOpenFile || "";
      complianceReviewComment = "";
      renderApp();
    });
  });

  document.querySelectorAll("[data-compliance-replace-file]").forEach((btn) => {
    btn.addEventListener("click", () => {
      replaceComplianceFile(btn.dataset.complianceSource || "", btn.dataset.complianceReplaceFile || "");
    });
  });

  document.querySelectorAll("[data-compliance-file-type-filter]").forEach((field) => {
    field.addEventListener("change", () => {
      const entityId = field.dataset.complianceFileTypeFilter;
      if (!entityId) return;
      if (!complianceFileFilterByEntity[entityId]) complianceFileFilterByEntity[entityId] = { fileType: "all", status: "all" };
      complianceFileFilterByEntity[entityId].fileType = field.value;
      renderApp();
    });
  });

  document.querySelectorAll("[data-compliance-file-status-filter]").forEach((field) => {
    field.addEventListener("change", () => {
      const entityId = field.dataset.complianceFileStatusFilter;
      if (!entityId) return;
      if (!complianceFileFilterByEntity[entityId]) complianceFileFilterByEntity[entityId] = { fileType: "all", status: "all" };
      complianceFileFilterByEntity[entityId].status = field.value;
      renderApp();
    });
  });

  const complianceReviewCommentInput = document.querySelector("[data-compliance-review-comment]");
  if (complianceReviewCommentInput) {
    complianceReviewCommentInput.addEventListener("input", () => {
      complianceReviewComment = complianceReviewCommentInput.value;
    });
  }

  document.querySelectorAll("[data-compliance-review-approve]").forEach((btn) => {
    btn.addEventListener("click", () => {
      reviewComplianceFile(btn.dataset.entityId || "", "通过");
    });
  });

  document.querySelectorAll("[data-compliance-review-reject]").forEach((btn) => {
    btn.addEventListener("click", () => {
      reviewComplianceFile(btn.dataset.entityId || "", "拒绝");
    });
  });

  document.querySelectorAll("[data-contracts-entity-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const entityId = btn.dataset.contractsEntityToggle || "";
      if (!entityId) return;
      if (contractsExpandedEntityIds.has(entityId)) contractsExpandedEntityIds.delete(entityId);
      else contractsExpandedEntityIds.add(entityId);
      renderApp();
    });
  });

  document.querySelectorAll("[data-contracts-subtab]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const entityId = btn.dataset.entityId || "";
      const tabId = btn.dataset.contractsSubtab || "";
      if (!entityId || !tabId) return;
      contractsSubTabByEntity[entityId] = tabId;
      renderApp();
    });
  });

  document.querySelectorAll("[data-contract-view-file]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const entity = getEntityById(btn.dataset.contractViewFile || "");
      if (!entity) return;
      contractsPreviewFileName = entity.contractData.current.fileName;
      contractsPreviewAttachmentPath = entity.contractData.current.attachmentPath;
      pageFlashMessage = "已打开合约原件预览。";
      renderApp();
    });
  });

  document.querySelectorAll("[data-contract-view-history-file]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const entity = getEntityById(btn.dataset.contractViewHistoryFile || "");
      if (!entity) return;
      const historical = entity.contractData.history[0];
      if (!historical) return;
      contractsPreviewFileName = `${historical.contractId}_${historical.version}.pdf`;
      contractsPreviewAttachmentPath = historical.attachmentPath || "./assets/attachments/sample-document.pdf";
      pageFlashMessage = "已打开历史合约预览。";
      renderApp();
    });
  });

  const contractPreviewClose = document.querySelector("[data-contract-preview-close]");
  if (contractPreviewClose) {
    contractPreviewClose.addEventListener("click", () => {
      contractsPreviewFileName = "";
      contractsPreviewAttachmentPath = "";
      renderApp();
    });
  }

  document.querySelectorAll("[data-contract-change-open]").forEach((btn) => {
    btn.addEventListener("click", () => {
      contractsChangeDrawerEntityId = btn.dataset.contractChangeOpen || "";
      contractsChangeType = "scope";
      contractsChangeReason = "";
      renderApp();
    });
  });

  const contractChangeTypeField = document.querySelector("[data-contract-change-type]");
  if (contractChangeTypeField) {
    contractChangeTypeField.addEventListener("change", () => {
      contractsChangeType = contractChangeTypeField.value;
    });
  }

  const contractChangeReasonField = document.querySelector("[data-contract-change-reason]");
  if (contractChangeReasonField) {
    contractChangeReasonField.addEventListener("input", () => {
      contractsChangeReason = contractChangeReasonField.value;
    });
  }

  const contractChangeCancel = document.querySelector("[data-contract-change-cancel]");
  if (contractChangeCancel) {
    contractChangeCancel.addEventListener("click", () => {
      contractsChangeDrawerEntityId = "";
      renderApp();
    });
  }

  document.querySelectorAll("[data-contract-change-submit]").forEach((btn) => {
    btn.addEventListener("click", () => {
      submitContractChange(btn.dataset.entityId || "");
    });
  });

  document.querySelectorAll("[data-contract-log-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const entityId = btn.dataset.contractLogToggle || "";
      contractsEditEntityId = contractsEditEntityId === entityId ? "" : entityId;
      renderApp();
    });
  });

  document.querySelectorAll("[data-product-open-drawer]").forEach((btn) => {
    btn.addEventListener("click", () => {
      openProductDrawer(btn.dataset.productOpenDrawer || "");
    });
  });

  document.querySelectorAll("[data-product-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const entityId = btn.dataset.productEntityId || "";
      const code = btn.dataset.productCode || "";
      if (btn.dataset.productAction === "开通") {
        openProductDrawer(entityId, code);
      } else {
        contractsProductManageEntityId = entityId;
        contractsProductManageCode = code;
        renderApp();
      }
    });
  });

  const productDrawerProduct = document.querySelector("[data-product-drawer-product]");
  if (productDrawerProduct) {
    productDrawerProduct.addEventListener("change", () => {
      contractsSelectedProductCode = productDrawerProduct.value;
    });
  }

  document.querySelectorAll("[data-product-drawer-currency]").forEach((box) => {
    box.addEventListener("change", () => {
      const ccy = box.dataset.productDrawerCurrency || "";
      if (!ccy) return;
      if (box.checked) contractsSelectedCurrencies.add(ccy);
      else contractsSelectedCurrencies.delete(ccy);
    });
  });

  const productDrawerRegions = document.querySelector("[data-product-drawer-regions]");
  if (productDrawerRegions) {
    productDrawerRegions.addEventListener("input", () => {
      contractsSelectedRegions = productDrawerRegions.value;
    });
  }

  const productDrawerFeePlan = document.querySelector("[data-product-drawer-fee-plan]");
  if (productDrawerFeePlan) {
    productDrawerFeePlan.addEventListener("change", () => {
      contractsSelectedFeePlanId = productDrawerFeePlan.value;
    });
  }

  const productDrawerCancel = document.querySelector("[data-product-drawer-cancel]");
  if (productDrawerCancel) {
    productDrawerCancel.addEventListener("click", () => {
      resetProductDrawer();
      renderApp();
    });
  }

  const productDrawerPrev = document.querySelector("[data-product-drawer-prev]");
  if (productDrawerPrev) {
    productDrawerPrev.addEventListener("click", () => {
      contractsProductDrawerStep = Math.max(1, contractsProductDrawerStep - 1);
      renderApp();
    });
  }

  document.querySelectorAll("[data-product-drawer-next]").forEach((btn) => {
    btn.addEventListener("click", () => {
      moveProductDrawerNext(btn.dataset.entityId || "");
    });
  });

  document.querySelectorAll("[data-product-drawer-confirm]").forEach((btn) => {
    btn.addEventListener("click", () => {
      confirmEnableProduct(btn.dataset.entityId || "");
    });
  });

  document.querySelectorAll("[data-product-manage-fee-plan]").forEach((btn) => {
    btn.addEventListener("click", () => {
      contractsFeePlanChangeDrawerEntityId = btn.dataset.entityId || "";
      contractsFeePlanChangeProductCode = btn.dataset.productCode || "";
      contractsFeePlanTarget = "";
      contractsFeePlanChangeReason = "";
      contractsFeePlanSecondApprover = "";
      renderApp();
    });
  });

  document.querySelectorAll("[data-product-manage-currencies]").forEach((btn) => {
    btn.addEventListener("click", () => {
      adjustProductCurrencies(btn.dataset.entityId || "", btn.dataset.productCode || "");
    });
  });

  document.querySelectorAll("[data-product-manage-pause]").forEach((btn) => {
    btn.addEventListener("click", () => {
      changeProductStatus(btn.dataset.entityId || "", btn.dataset.productCode || "", "已暂停");
    });
  });

  document.querySelectorAll("[data-product-manage-resume]").forEach((btn) => {
    btn.addEventListener("click", () => {
      changeProductStatus(btn.dataset.entityId || "", btn.dataset.productCode || "", "生效");
    });
  });

  document.querySelectorAll("[data-product-manage-terminate]").forEach((btn) => {
    btn.addEventListener("click", () => {
      changeProductStatus(btn.dataset.entityId || "", btn.dataset.productCode || "", "已终止");
    });
  });

  const feePlanTargetField = document.querySelector("[data-fee-plan-change-target]");
  if (feePlanTargetField) {
    feePlanTargetField.addEventListener("change", () => {
      contractsFeePlanTarget = feePlanTargetField.value;
    });
  }

  const feePlanReasonField = document.querySelector("[data-fee-plan-change-reason]");
  if (feePlanReasonField) {
    feePlanReasonField.addEventListener("input", () => {
      contractsFeePlanChangeReason = feePlanReasonField.value;
    });
  }

  const feePlanApproverField = document.querySelector("[data-fee-plan-change-approver]");
  if (feePlanApproverField) {
    feePlanApproverField.addEventListener("change", () => {
      contractsFeePlanSecondApprover = feePlanApproverField.value;
    });
  }

  const feePlanCancel = document.querySelector("[data-fee-plan-change-cancel]");
  if (feePlanCancel) {
    feePlanCancel.addEventListener("click", () => {
      contractsFeePlanChangeDrawerEntityId = "";
      contractsFeePlanChangeProductCode = "";
      renderApp();
    });
  }

  document.querySelectorAll("[data-fee-plan-change-submit]").forEach((btn) => {
    btn.addEventListener("click", () => {
      submitFeePlanChange(btn.dataset.entityId || "", btn.dataset.productCode || "");
    });
  });

  document.querySelectorAll("[data-accounts-entity-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const entityId = btn.dataset.accountsEntityToggle || "";
      if (!entityId) return;
      if (accountsExpandedEntityIds.has(entityId)) accountsExpandedEntityIds.delete(entityId);
      else accountsExpandedEntityIds.add(entityId);
      renderApp();
    });
  });

  document.querySelectorAll("[data-accounts-subtab]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const entityId = btn.dataset.entityId || "";
      const tabId = btn.dataset.accountsSubtab || "";
      if (!entityId || !tabId) return;
      accountsSubTabByEntity[entityId] = tabId;
      renderApp();
    });
  });

  document.querySelectorAll("[data-accounts-manage-account]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const entityId = btn.dataset.entityId || "";
      const accountId = btn.dataset.accountId || "";
      const shouldClose = accountsManageEntityId === entityId && accountsManageAccountId === accountId;
      clearAccountsDrawerState();
      if (!shouldClose) {
        accountsManageEntityId = entityId;
        accountsManageAccountId = accountId;
      }
      renderApp();
    });
  });

  document.querySelectorAll("[data-accounts-toggle-deposit]").forEach((btn) => {
    btn.addEventListener("click", () => {
      toggleAccountDirection(btn.dataset.entityId || "", btn.dataset.accountId || "", "deposit");
    });
  });

  document.querySelectorAll("[data-accounts-toggle-withdraw]").forEach((btn) => {
    btn.addEventListener("click", () => {
      toggleAccountDirection(btn.dataset.entityId || "", btn.dataset.accountId || "", "withdraw");
    });
  });

  document.querySelectorAll("[data-accounts-toggle-account-status]").forEach((btn) => {
    btn.addEventListener("click", () => {
      toggleSubAccountStatus(btn.dataset.entityId || "", btn.dataset.accountId || "", btn.dataset.accountType || "");
    });
  });

  document.querySelectorAll("[data-accounts-view-ledger]").forEach((btn) => {
    btn.addEventListener("click", () => {
      pageFlashMessage = "已跳转账务域查看该账户流水（演示）。";
      renderApp();
    });
  });

  document.querySelectorAll("[data-accounts-copy-address]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const value = btn.dataset.accountsCopyAddress || "";
      if (!value) return;
      try {
        await navigator.clipboard.writeText(value);
        pageFlashMessage = "地址已复制到剪贴板。";
      } catch {
        pageFlashMessage = "复制失败，请手动复制。";
      }
      renderApp();
    });
  });

  document.querySelectorAll("[data-accounts-pause-all-open]").forEach((btn) => {
    btn.addEventListener("click", () => {
      clearAccountsDrawerState();
      accountsPauseDrawerEntityId = btn.dataset.entityId || "";
      accountsPauseReason = "";
      accountsResumeSecondApprover = "";
      renderApp();
    });
  });

  const pauseReasonInput = document.querySelector("[data-accounts-pause-reason]");
  if (pauseReasonInput) {
    pauseReasonInput.addEventListener("input", () => {
      accountsPauseReason = pauseReasonInput.value;
    });
  }

  const resumeApproverInput = document.querySelector("[data-accounts-resume-approver]");
  if (resumeApproverInput) {
    resumeApproverInput.addEventListener("change", () => {
      accountsResumeSecondApprover = resumeApproverInput.value;
    });
  }

  const pauseCancel = document.querySelector("[data-accounts-pause-cancel]");
  if (pauseCancel) {
    pauseCancel.addEventListener("click", () => {
      clearAccountsDrawerState();
      renderApp();
    });
  }

  document.querySelectorAll("[data-accounts-pause-submit]").forEach((btn) => {
    btn.addEventListener("click", () => {
      submitUnifiedAccountPause(btn.dataset.entityId || "");
    });
  });

  document.querySelectorAll("[data-accounts-open-add-fiat]").forEach((btn) => {
    btn.addEventListener("click", () => {
      clearAccountsDrawerState();
      accountsAddFiatDrawerEntityId = btn.dataset.entityId || "";
      accountsAddFiatStep = 1;
      accountsAddFiatBankId = "";
      renderApp();
    });
  });

  const addFiatBank = document.querySelector("[data-accounts-add-fiat-bank]");
  if (addFiatBank) {
    addFiatBank.addEventListener("change", () => {
      accountsAddFiatBankId = addFiatBank.value;
    });
  }

  const addFiatCancel = document.querySelector("[data-accounts-add-fiat-cancel]");
  if (addFiatCancel) {
    addFiatCancel.addEventListener("click", () => {
      clearAccountsDrawerState();
      renderApp();
    });
  }

  document.querySelectorAll("[data-accounts-add-fiat-next]").forEach((btn) => {
    btn.addEventListener("click", () => {
      moveAddFiatStep(btn.dataset.entityId || "");
    });
  });

  document.querySelectorAll("[data-accounts-add-fiat-submit]").forEach((btn) => {
    btn.addEventListener("click", () => {
      submitAddFiatAccount(btn.dataset.entityId || "");
    });
  });

  document.querySelectorAll("[data-accounts-open-add-bank]").forEach((btn) => {
    btn.addEventListener("click", () => {
      clearAccountsDrawerState();
      accountsAddBankDrawerEntityId = btn.dataset.entityId || "";
      accountsAddBankName = "";
      accountsAddBankCurrency = "";
      accountsAddBankOpenDate = "";
      accountsAddBankNote = "";
      accountsAutoCreateFiat = true;
      renderApp();
    });
  });

  const addBankName = document.querySelector("[data-accounts-add-bank-name]");
  if (addBankName) {
    addBankName.addEventListener("change", () => {
      accountsAddBankName = addBankName.value;
    });
  }
  const addBankCurrency = document.querySelector("[data-accounts-add-bank-currency]");
  if (addBankCurrency) {
    addBankCurrency.addEventListener("change", () => {
      accountsAddBankCurrency = addBankCurrency.value;
    });
  }
  const addBankDate = document.querySelector("[data-accounts-add-bank-date]");
  if (addBankDate) {
    addBankDate.addEventListener("change", () => {
      accountsAddBankOpenDate = addBankDate.value;
    });
  }
  const addBankNote = document.querySelector("[data-accounts-add-bank-note]");
  if (addBankNote) {
    addBankNote.addEventListener("input", () => {
      accountsAddBankNote = addBankNote.value;
    });
  }
  const addBankAuto = document.querySelector("[data-accounts-add-bank-auto-fiat]");
  if (addBankAuto) {
    addBankAuto.addEventListener("change", () => {
      accountsAutoCreateFiat = addBankAuto.checked;
    });
  }
  const addBankCancel = document.querySelector("[data-accounts-add-bank-cancel]");
  if (addBankCancel) {
    addBankCancel.addEventListener("click", () => {
      clearAccountsDrawerState();
      renderApp();
    });
  }
  document.querySelectorAll("[data-accounts-add-bank-submit]").forEach((btn) => {
    btn.addEventListener("click", () => {
      submitAddBankRecord(btn.dataset.entityId || "");
    });
  });

  document.querySelectorAll("[data-accounts-bank-associate]").forEach((btn) => {
    btn.addEventListener("click", () => {
      associateBankToFiat(btn.dataset.entityId || "", btn.dataset.bankId || "");
    });
  });

  document.querySelectorAll("[data-accounts-whitelist-type-filter]").forEach((field) => {
    field.addEventListener("change", () => {
      const entityId = field.dataset.accountsWhitelistTypeFilter || "";
      if (!entityId) return;
      accountsWhitelistFilterByEntity[entityId].type = field.value;
      renderApp();
    });
  });

  document.querySelectorAll("[data-accounts-whitelist-status-filter]").forEach((field) => {
    field.addEventListener("change", () => {
      const entityId = field.dataset.accountsWhitelistStatusFilter || "";
      if (!entityId) return;
      accountsWhitelistFilterByEntity[entityId].status = field.value;
      renderApp();
    });
  });

  document.querySelectorAll("[data-accounts-whitelist-open-review]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const entityId = btn.dataset.entityId || "";
      const entryId = btn.dataset.entryId || "";
      const shouldClose = accountsWhitelistReviewEntityId === entityId && accountsWhitelistReviewEntryId === entryId;
      clearAccountsDrawerState();
      if (!shouldClose) {
        accountsWhitelistReviewEntityId = entityId;
        accountsWhitelistReviewEntryId = entryId;
        accountsWhitelistReviewComment = "";
      }
      renderApp();
    });
  });

  const whitelistReviewComment = document.querySelector("[data-accounts-whitelist-review-comment]");
  if (whitelistReviewComment) {
    whitelistReviewComment.addEventListener("input", () => {
      accountsWhitelistReviewComment = whitelistReviewComment.value;
    });
  }

  document.querySelectorAll("[data-accounts-whitelist-approve]").forEach((btn) => {
    btn.addEventListener("click", () => {
      reviewWhitelistEntry(btn.dataset.entityId || "", btn.dataset.entryId || "", "通过");
    });
  });

  document.querySelectorAll("[data-accounts-whitelist-reject]").forEach((btn) => {
    btn.addEventListener("click", () => {
      reviewWhitelistEntry(btn.dataset.entityId || "", btn.dataset.entryId || "", "拒绝");
    });
  });

  document.querySelectorAll("[data-accounts-drawer-close]").forEach((btn) => {
    btn.addEventListener("click", () => {
      clearAccountsDrawerState();
      renderApp();
    });
  });

  document.querySelectorAll("[data-members-entity-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const entityId = btn.dataset.membersEntityToggle || "";
      if (!entityId) return;
      if (membersExpandedEntityIds.has(entityId)) membersExpandedEntityIds.delete(entityId);
      else membersExpandedEntityIds.add(entityId);
      renderApp();
    });
  });

  document.querySelectorAll("[data-members-subtab]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const entityId = btn.dataset.entityId || "";
      const tabId = btn.dataset.membersSubtab || "";
      if (!entityId || !tabId) return;
      membersSubTabByEntity[entityId] = tabId;
      renderApp();
    });
  });

  document.querySelectorAll("[data-members-role-filter]").forEach((field) => {
    field.addEventListener("change", () => {
      const entityId = field.dataset.membersRoleFilter || "";
      if (!entityId) return;
      membersFilterByEntity[entityId].role = field.value;
      renderApp();
    });
  });

  document.querySelectorAll("[data-members-status-filter]").forEach((field) => {
    field.addEventListener("change", () => {
      const entityId = field.dataset.membersStatusFilter || "";
      if (!entityId) return;
      membersFilterByEntity[entityId].status = field.value;
      renderApp();
    });
  });

  document.querySelectorAll("[data-members-country-filter]").forEach((field) => {
    field.addEventListener("change", () => {
      const entityId = field.dataset.membersCountryFilter || "";
      if (!entityId) return;
      membersFilterByEntity[entityId].country = field.value;
      renderApp();
    });
  });

  document.querySelectorAll("[data-members-show-removed]").forEach((box) => {
    box.addEventListener("change", () => {
      const entityId = box.dataset.membersShowRemoved || "";
      if (!entityId) return;
      membersShowRemovedByEntity[entityId] = box.checked;
      renderApp();
    });
  });

  document.querySelectorAll("[data-members-open-detail]").forEach((btn) => {
    btn.addEventListener("click", () => {
      membersDetailEntityId = btn.dataset.entityId || "";
      membersDetailMemberId = btn.dataset.memberId || "";
      renderApp();
    });
  });

  document.querySelectorAll("[data-members-toggle-status]").forEach((btn) => {
    btn.addEventListener("click", () => {
      toggleMemberStatus(btn.dataset.entityId || "", btn.dataset.memberId || "");
    });
  });

  document.querySelectorAll("[data-members-view-audit]").forEach((btn) => {
    btn.addEventListener("click", () => {
      pageFlashMessage = `已跳转成员审计日志（成员ID：${btn.dataset.memberId || "-" }，演示）。`;
      renderApp();
    });
  });

  document.querySelectorAll("[data-members-open-appointment]").forEach((btn) => {
    btn.addEventListener("click", () => {
      membersAppointmentDetailEntityId = btn.dataset.entityId || "";
      membersAppointmentDetailId = btn.dataset.appointmentId || "";
      membersAppointmentSecondApprover = "";
      renderApp();
    });
  });

  document.querySelectorAll("[data-members-open-new-appointment]").forEach((btn) => {
    btn.addEventListener("click", () => {
      membersNewAppointmentDrawerEntityId = btn.dataset.entityId || "";
      membersAppointeeName = "";
      membersAppointeeEmail = "";
      membersAppointeeTitle = "";
      membersAppointmentLetterName = "";
      membersAppointeeIdFileName = "";
      renderApp();
    });
  });

  const newAppName = document.querySelector("[data-members-new-name]");
  if (newAppName) {
    newAppName.addEventListener("input", () => {
      membersAppointeeName = newAppName.value;
    });
  }
  const newAppEmail = document.querySelector("[data-members-new-email]");
  if (newAppEmail) {
    newAppEmail.addEventListener("input", () => {
      membersAppointeeEmail = newAppEmail.value;
    });
  }
  const newAppTitle = document.querySelector("[data-members-new-title]");
  if (newAppTitle) {
    newAppTitle.addEventListener("input", () => {
      membersAppointeeTitle = newAppTitle.value;
    });
  }
  const newAppLetter = document.querySelector("[data-members-new-letter]");
  if (newAppLetter) {
    newAppLetter.addEventListener("input", () => {
      membersAppointmentLetterName = newAppLetter.value;
    });
  }
  const newAppIdFile = document.querySelector("[data-members-new-idfile]");
  if (newAppIdFile) {
    newAppIdFile.addEventListener("input", () => {
      membersAppointeeIdFileName = newAppIdFile.value;
    });
  }

  const cancelNewAppointment = document.querySelector("[data-members-new-appointment-cancel]");
  if (cancelNewAppointment) {
    cancelNewAppointment.addEventListener("click", () => {
      membersNewAppointmentDrawerEntityId = "";
      renderApp();
    });
  }

  document.querySelectorAll("[data-members-new-appointment-submit]").forEach((btn) => {
    btn.addEventListener("click", () => {
      submitNewAppointment(btn.dataset.entityId || "");
    });
  });

  document.querySelectorAll("[data-members-appointment-check]").forEach((field) => {
    field.addEventListener("change", () => {
      updateAppointmentCheck(
        field.dataset.entityId || "",
        field.dataset.appointmentId || "",
        field.dataset.checkKey || "",
        field.value
      );
    });
  });

  document.querySelectorAll("[data-members-appointment-pass]").forEach((btn) => {
    btn.addEventListener("click", () => {
      submitAppointmentKyc(btn.dataset.entityId || "", btn.dataset.appointmentId || "", true);
    });
  });

  document.querySelectorAll("[data-members-appointment-reject]").forEach((btn) => {
    btn.addEventListener("click", () => {
      submitAppointmentKyc(btn.dataset.entityId || "", btn.dataset.appointmentId || "", false);
    });
  });

  const appSecondApprover = document.querySelector("[data-members-appointment-second-approver]");
  if (appSecondApprover) {
    appSecondApprover.addEventListener("change", () => {
      membersAppointmentSecondApprover = appSecondApprover.value;
    });
  }

  document.querySelectorAll("[data-members-appointment-confirm]").forEach((btn) => {
    btn.addEventListener("click", () => {
      confirmAppointment(btn.dataset.entityId || "", btn.dataset.appointmentId || "");
    });
  });

  document.querySelectorAll("[data-members-open-apikey]").forEach((btn) => {
    btn.addEventListener("click", () => {
      membersApiKeyDetailEntityId = btn.dataset.entityId || "";
      membersApiKeyDetailId = btn.dataset.keyId || "";
      renderApp();
    });
  });

  document.querySelectorAll("[data-members-force-revoke-key]").forEach((btn) => {
    btn.addEventListener("click", () => {
      forceRevokeApiKey(btn.dataset.entityId || "", btn.dataset.keyId || "");
    });
  });

  const teamEditBtn = document.getElementById("team-edit-btn");
  if (teamEditBtn) {
    teamEditBtn.addEventListener("click", () => {
      merchantTeamEditing = true;
      renderApp();
    });
  }

  const teamCancelBtn = document.getElementById("team-cancel-btn");
  if (teamCancelBtn) {
    teamCancelBtn.addEventListener("click", () => {
      merchantTeamEditing = false;
      renderApp();
    });
  }

  const teamSaveBtn = document.getElementById("team-save-btn");
  if (teamSaveBtn) {
    teamSaveBtn.addEventListener("click", () => {
      saveMerchantTeam();
    });
  }

  const teamRm = document.getElementById("team-rm-select");
  if (teamRm) {
    teamRm.addEventListener("change", () => {
      merchantTeamDraft.rm = teamRm.value;
    });
  }

  const noteSubmit = document.getElementById("internal-note-submit");
  if (noteSubmit) {
    noteSubmit.addEventListener("click", () => {
      addInternalNote();
    });
  }

  const noteToggle = document.getElementById("internal-note-toggle");
  if (noteToggle) {
    noteToggle.addEventListener("click", () => {
      showAllInternalNotes = !showAllInternalNotes;
      renderApp();
    });
  }

  const openAddLicenseDrawer = document.getElementById("open-add-license-drawer");
  if (openAddLicenseDrawer) {
    openAddLicenseDrawer.addEventListener("click", () => {
      addLicenseDrawerOpen = true;
      addLicenseError = "";
      addLicenseSelected = "";
      addLicenseReuseDocs.clear();
      renderApp();
    });
  }

  const closeAddLicenseDrawer = document.getElementById("close-add-license-drawer");
  if (closeAddLicenseDrawer) {
    closeAddLicenseDrawer.addEventListener("click", () => {
      addLicenseDrawerOpen = false;
      addLicenseError = "";
      renderApp();
    });
  }

  const addLicenseSelect = document.getElementById("add-license-select");
  if (addLicenseSelect) {
    addLicenseSelect.addEventListener("change", () => {
      addLicenseSelected = addLicenseSelect.value;
      addLicenseError = "";
      renderApp();
    });
  }

  document.querySelectorAll("[data-reuse-doc]").forEach((box) => {
    box.addEventListener("change", () => {
      const doc = box.dataset.reuseDoc;
      if (box.checked) addLicenseReuseDocs.add(doc);
      else addLicenseReuseDocs.delete(doc);
    });
  });

  const submitAddLicense = document.getElementById("submit-add-license");
  if (submitAddLicense) {
    submitAddLicense.addEventListener("click", () => {
      submitAddLicenseFlow();
    });
  }

  const merchantSearch = document.getElementById("merchant-search-input");
  if (merchantSearch) {
    merchantSearch.addEventListener("input", (event) => {
      merchantSearchInput = event.target.value;
      if (merchantSearchTimer) {
        clearTimeout(merchantSearchTimer);
      }
      merchantSearchTimer = setTimeout(() => {
        merchantSearchKeyword = merchantSearchInput.trim().toLowerCase();
        renderApp();
      }, 300);
    });
  }

  const merchantLicenseFilter = document.getElementById("merchant-filter-license");
  if (merchantLicenseFilter) {
    merchantLicenseFilter.addEventListener("change", () => {
      merchantFilters.license = merchantLicenseFilter.value;
      renderApp();
    });
  }

  const merchantComplianceFilter = document.getElementById("merchant-filter-compliance");
  if (merchantComplianceFilter) {
    merchantComplianceFilter.addEventListener("change", () => {
      merchantFilters.complianceStatus = merchantComplianceFilter.value;
      renderApp();
    });
  }

  const merchantKybFilter = document.getElementById("merchant-filter-kyb");
  if (merchantKybFilter) {
    merchantKybFilter.addEventListener("change", () => {
      merchantFilters.kybStatus = merchantKybFilter.value;
      renderApp();
    });
  }

  const merchantDatePreset = document.getElementById("merchant-filter-date-preset");
  if (merchantDatePreset) {
    merchantDatePreset.addEventListener("change", () => {
      merchantFilters.datePreset = merchantDatePreset.value;
      if (merchantDatePreset.value !== "custom") {
        const { startDate: start, endDate: end } = getDateRangeByPreset(merchantDatePreset.value);
        merchantFilters.startDate = start;
        merchantFilters.endDate = end;
      }
      renderApp();
    });
  }

  const merchantStartDate = document.getElementById("merchant-filter-start-date");
  if (merchantStartDate) {
    merchantStartDate.addEventListener("change", () => {
      merchantFilters.startDate = merchantStartDate.value;
      renderApp();
    });
  }

  const merchantEndDate = document.getElementById("merchant-filter-end-date");
  if (merchantEndDate) {
    merchantEndDate.addEventListener("change", () => {
      merchantFilters.endDate = merchantEndDate.value;
      renderApp();
    });
  }

  document.querySelectorAll("[data-merchant-sort]").forEach((th) => {
    th.addEventListener("click", () => {
      const field = th.dataset.merchantSort;
      if (merchantSort.field === field) {
        merchantSort.direction = merchantSort.direction === "asc" ? "desc" : "asc";
      } else {
        merchantSort.field = field;
        merchantSort.direction = field === "onboardedAt" ? "desc" : "asc";
      }
      renderApp();
    });
  });

  const merchantClearAll = document.getElementById("merchant-clear-filters");
  if (merchantClearAll) {
    merchantClearAll.addEventListener("click", () => {
      resetMerchantSearchFilters();
      renderApp();
    });
  }

  const merchantClearEmpty = document.getElementById("merchant-clear-empty");
  if (merchantClearEmpty) {
    merchantClearEmpty.addEventListener("click", () => {
      resetMerchantSearchFilters();
      renderApp();
    });
  }

  const openDrawer = document.getElementById("open-new-merchant");
  if (openDrawer) {
    openDrawer.addEventListener("click", () => {
      merchantDrawerOpen = true;
      merchantDrawerError = "";
      renderApp();
    });
  }

  const closeDrawer = document.getElementById("close-merchant-drawer");
  if (closeDrawer) {
    closeDrawer.addEventListener("click", () => {
      merchantDrawerOpen = false;
      merchantDrawerError = "";
      renderApp();
    });
  }

  const drawerMask = document.getElementById("merchant-drawer-mask");
  if (drawerMask) {
    drawerMask.addEventListener("click", () => {
      merchantDrawerOpen = false;
      merchantDrawerError = "";
      renderApp();
    });
  }

  const createForm = document.getElementById("merchant-create-form");
  if (createForm) {
    createForm.addEventListener("submit", (event) => {
      event.preventDefault();
      submitCreateMerchant();
    });
  }

  const formIds = [
    "create-legal-name",
    "create-local-name",
    "create-jurisdiction",
    "create-admin-email",
    "create-enterprise-group",
    "create-rm",
    "create-notes",
  ];

  formIds.forEach((id) => {
    const field = document.getElementById(id);
    if (field) {
      field.addEventListener("input", () => {
        mapCreateField(id, field.value);
      });
      field.addEventListener("change", () => {
        mapCreateField(id, field.value);
      });
    }
  });

  document.querySelectorAll("[data-create-license]").forEach((box) => {
    box.addEventListener("change", () => {
      const value = box.dataset.createLicense;
      if (box.checked) {
        newMerchantForm.targetLicenses.add(value);
      } else {
        newMerchantForm.targetLicenses.delete(value);
      }
    });
  });
}

function mapCreateField(id, value) {
  if (id === "create-legal-name") newMerchantForm.legalName = value;
  if (id === "create-local-name") newMerchantForm.localName = value;
  if (id === "create-jurisdiction") newMerchantForm.jurisdiction = value;
  if (id === "create-admin-email") newMerchantForm.adminEmail = value;
  if (id === "create-enterprise-group") newMerchantForm.enterpriseGroup = value;
  if (id === "create-rm") newMerchantForm.rm = value;
  if (id === "create-notes") newMerchantForm.notes = value;
}

function submitCreateMerchant() {
  const requiredMissing = [];

  if (!newMerchantForm.legalName.trim()) requiredMissing.push("商户名称（英文）");
  if (!newMerchantForm.jurisdiction) requiredMissing.push("注册地（司法管辖区）");
  if (!newMerchantForm.adminEmail.trim()) requiredMissing.push("主联系人邮箱");
  if (!newMerchantForm.targetLicenses.size) requiredMissing.push("目标牌照");
  if (newMerchantForm.adminEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newMerchantForm.adminEmail.trim())) {
    requiredMissing.push("主联系人邮箱格式");
  }

  if (requiredMissing.length > 0) {
    merchantDrawerError = `请先填写必填项：${requiredMissing.join("、")}`;
    renderApp();
    return;
  }

  const nextMerchantId = generateNextMerchantId();
  const nextCustomerProfileId = generateNextCustomerProfileId();
  const merchant = {
    id: nextMerchantId,
    customerProfileId: nextCustomerProfileId,
    name: newMerchantForm.legalName.trim(),
    localName: newMerchantForm.localName.trim(),
    registrationNo: generateRegistrationNo(),
    adminEmail: newMerchantForm.adminEmail.trim(),
    licenses: [...newMerchantForm.targetLicenses],
    complianceStatus: "正常",
    kybStatus: "待提交",
    onboardedAt: new Date().toISOString(),
    jurisdiction: newMerchantForm.jurisdiction,
    enterpriseGroup: newMerchantForm.enterpriseGroup.trim(),
    rm: newMerchantForm.rm,
    notes: newMerchantForm.notes.trim(),
    actualOperatingRegion: newMerchantForm.jurisdiction,
    businessDescription: "待补充",
    createdAt: new Date().toISOString(),
    createdBy: currentOps,
    profileAuditLogs: [],
    teamAuditLogs: [],
    internalNotes: [],
    documentVaultMaterials: ["公司注册证书", "商业登记证明", "董事名册", "UBO 声明"],
    legalEntities: [...newMerchantForm.targetLicenses].map((license, idx) => ({
      id: `CLE-${nextCustomerProfileId.replace(/\D/g, "")}-${String(idx + 1).padStart(2, "0")}`,
      licenseName: license,
      activationStatus: "待提交",
      kybStatus: "pending",
      reusedDocuments: [],
    })),
  };

  merchants.unshift(merchant);
  merchant.legalEntities.forEach((entity, idx) => hydrateLegalEntity(merchant, entity, idx));
  resetNewMerchantForm();
  merchantDrawerOpen = false;
  merchantDrawerError = "";
  pageFlashMessage = "商户创建成功，系统已自动发送 Admin 激活邮件。";

  selectedMerchantId = merchant.id;
  activeMerchantTab = "kyb";
  setRoute("merchantDetail");
}

function generateNextMerchantId() {
  const maxNo = merchants.reduce((max, merchant) => {
    const num = Number((merchant.id || "").replace(/\D/g, ""));
    return Number.isNaN(num) ? max : Math.max(max, num);
  }, 100000);
  return `M-${maxNo + 1}`;
}

function generateNextCustomerProfileId() {
  const maxNo = merchants.reduce((max, merchant) => {
    const num = Number((merchant.customerProfileId || "").replace(/\D/g, ""));
    return Number.isNaN(num) ? max : Math.max(max, num);
  }, 12300);
  return `CP-${String(maxNo + 1).padStart(8, "0")}`;
}

function generateRegistrationNo() {
  const number = Math.floor(10000000 + Math.random() * 90000000);
  return String(number);
}

function resetNewMerchantForm() {
  newMerchantForm.legalName = "";
  newMerchantForm.localName = "";
  newMerchantForm.jurisdiction = "";
  newMerchantForm.adminEmail = "";
  newMerchantForm.enterpriseGroup = "";
  newMerchantForm.targetLicenses.clear();
  newMerchantForm.rm = "";
  newMerchantForm.notes = "";
}

function resetMerchantSearchFilters() {
  if (merchantSearchTimer) {
    clearTimeout(merchantSearchTimer);
    merchantSearchTimer = null;
  }
  merchantSearchInput = "";
  merchantSearchKeyword = "";
  merchantFilters.license = "all";
  merchantFilters.complianceStatus = "all";
  merchantFilters.kybStatus = "all";
  merchantFilters.datePreset = "all";
  merchantFilters.startDate = "";
  merchantFilters.endDate = "";
  merchantSort.field = "onboardedAt";
  merchantSort.direction = "desc";
}

function getSelectedMerchant() {
  return merchants.find((item) => item.id === selectedMerchantId) || null;
}

function syncMerchantDetailDrafts(merchant) {
  if (!merchant) return;
  if (merchantProfileDraft.merchantId !== merchant.id) {
    merchantProfileDraft.merchantId = merchant.id;
    merchantProfileDraft.localName = merchant.localName || "";
    merchantProfileDraft.operatingRegion = merchant.actualOperatingRegion || "";
    merchantProfileDraft.businessDescription = merchant.businessDescription || "";
    merchantProfileDraft.enterpriseGroup = merchant.enterpriseGroup || "";
  }
  if (merchantTeamDraft.merchantId !== merchant.id) {
    merchantTeamDraft.merchantId = merchant.id;
    merchantTeamDraft.rm = merchant.rm || "";
  }
}

function pushAuditLog(list, action, beforeValue, afterValue) {
  list.unshift({
    at: new Date().toISOString(),
    operator: currentOps,
    action,
    beforeValue,
    afterValue,
  });
}

function saveMerchantProfile() {
  const merchant = getSelectedMerchant();
  if (!merchant) return;

  if (!window.confirm("确认保存客户档案修改？此操作将写入审计日志。")) return;

  const before = {
    localName: merchant.localName || "",
    operatingRegion: merchant.actualOperatingRegion || "",
    businessDescription: merchant.businessDescription || "",
    enterpriseGroup: merchant.enterpriseGroup || "",
  };
  const after = {
    localName: merchantProfileDraft.localName.trim(),
    operatingRegion: merchantProfileDraft.operatingRegion.trim(),
    businessDescription: merchantProfileDraft.businessDescription.trim(),
    enterpriseGroup: merchantProfileDraft.enterpriseGroup.trim(),
  };

  merchant.localName = after.localName;
  merchant.actualOperatingRegion = after.operatingRegion;
  merchant.businessDescription = after.businessDescription;
  merchant.enterpriseGroup = after.enterpriseGroup;

  pushAuditLog(merchant.profileAuditLogs, "编辑客户档案", JSON.stringify(before), JSON.stringify(after));
  merchantProfileEditing = false;
  pageFlashMessage = "客户档案已保存，审计日志已记录。";
  renderApp();
}

function saveMerchantTeam() {
  const merchant = getSelectedMerchant();
  if (!merchant) return;

  const before = merchant.rm || "";
  const after = merchantTeamDraft.rm || "";
  merchant.rm = after;
  pushAuditLog(merchant.teamAuditLogs, "更新负责 RM", before, after);
  merchantTeamEditing = false;
  pageFlashMessage = "负责团队已更新，审计日志已记录。";
  renderApp();
}

function addInternalNote() {
  const merchant = getSelectedMerchant();
  if (!merchant) return;
  const input = document.getElementById("internal-note-input");
  if (!input) return;
  const content = input.value.trim();
  if (!content) return;

  merchant.internalNotes.unshift({
    at: new Date().toISOString(),
    operator: currentOps,
    content,
  });
  input.value = "";
  pageFlashMessage = "内部备注已记录。";
  renderApp();
}

function submitAddLicenseFlow() {
  const merchant = getSelectedMerchant();
  if (!merchant) return;
  if (!addLicenseSelected) {
    addLicenseError = "请选择目标牌照。";
    renderApp();
    return;
  }

  const exists = merchant.legalEntities.some((item) => item.licenseName === addLicenseSelected);
  if (exists) {
    addLicenseError = "该商户已在此牌照下入驻";
    renderApp();
    return;
  }

  const nextIndex = merchant.legalEntities.length + 1;
  const entityId = `CLE-${merchant.customerProfileId.replace(/\D/g, "")}-${String(nextIndex).padStart(2, "0")}`;
  const entity = {
    id: entityId,
    licenseName: addLicenseSelected,
    activationStatus: "待提交",
    kybStatus: "pending",
    reusedDocuments: [...addLicenseReuseDocs],
  };
  hydrateLegalEntity(merchant, entity, merchant.legalEntities.length);
  merchant.legalEntities.push(entity);
  if (!merchant.licenses.includes(addLicenseSelected)) {
    merchant.licenses.push(addLicenseSelected);
  }

  pushAuditLog(
    merchant.profileAuditLogs,
    "追加入驻牌照",
    "-",
    `${addLicenseSelected} / ${entityId} / 复用${entity.reusedDocuments.length}份材料`
  );
  addLicenseDrawerOpen = false;
  addLicenseSelected = "";
  addLicenseReuseDocs.clear();
  addLicenseError = "";
  activeMerchantTab = "kyb";
  kybFocusEntityId = entityId;
  pageFlashMessage = "已创建新的入驻关系（kyb_status = pending），已跳转至入驻与 KYB。";
  renderApp();
}

function getEntityById(entityId) {
  const merchant = getSelectedMerchant();
  if (!merchant) return null;
  return merchant.legalEntities.find((item) => item.id === entityId) || null;
}

function getEntityMaterialsSummary(entity) {
  const doneStatuses = new Set(["已验证", "已签署", "已确认"]);
  const doneCount = entity.materials.filter((item) => doneStatuses.has(item.status)).length;
  const total = entity.materials.length;
  const pendingItems = entity.materials
    .filter((item) => !doneStatuses.has(item.status))
    .map((item) => (item.personName ? `${item.personName} ${item.label}` : item.label));
  return { doneCount, total, pendingItems };
}

function getMaterialById(entity, materialId) {
  return entity.materials.find((item) => item.id === materialId) || null;
}

function updateMaterialReviewStatus(action) {
  const entity = getEntityById(kybReviewEntityId);
  if (!entity) return;
  const material = getMaterialById(entity, kybReviewMaterialId);
  if (!material) return;

  const approveStatus = material.group === "协议文件" ? (material.label.includes("协议") ? "已签署" : "已确认") : "已验证";
  const rejectStatus = "待重新上传";

  const previousStatus = material.status;
  const nextStatus = action === "通过" ? approveStatus : rejectStatus;
  material.status = nextStatus;
  let sharedImpactCount = 0;

  if (material.source === "共享" && material.sharedKey) {
    const merchant = getSelectedMerchant();
    if (merchant) {
      merchant.legalEntities.forEach((otherEntity) => {
        otherEntity.materials.forEach((otherMaterial) => {
          if (otherMaterial.sharedKey === material.sharedKey) {
            otherMaterial.status = nextStatus;
            sharedImpactCount += 1;
          }
        });
      });
    }
  }

  entity.history.unshift(
    createEntityHistoryRecord({
      actor: currentOps,
      action: action === "通过" ? `文件审核通过（${material.label}）` : `文件审核拒绝（${material.label}）`,
      detail: kybReviewComment.trim() || "",
      context: {
        materialId: material.id,
        materialLabel: material.label,
        materialSource: material.source,
        materialGroup: material.group,
      },
      changes: [
        {
          field: "材料状态",
          before: previousStatus || "待审核",
          after: nextStatus,
        },
        ...(material.source === "共享" && material.sharedKey
          ? [
              {
                field: "跨牌照同步影响",
                before: "未同步",
                after: `已同步 ${Math.max(sharedImpactCount - 1, 0)} 个其他牌照`,
              },
            ]
          : []),
      ],
    })
  );

  kybReviewComment = "";
  pageFlashMessage = action === "通过" ? "文件审核已通过。" : "文件已拒绝并要求重新上传。";
  renderApp();
}

function canResendActivation(entity) {
  if (entity.adminActivationStatus !== "已发送待激活") return false;
  const sentAt = new Date(entity.adminActivationSentAt || 0).getTime();
  const now = Date.now();
  return now - sentAt > 48 * 60 * 60 * 1000;
}

function rejectEntityKyb(entityId) {
  const entity = getEntityById(entityId);
  if (!entity) return;

  const reason = (entity.decisionDraft.rejectReason || "").trim();
  if (!reason) {
    pageFlashMessage = "拒绝申请前请填写拒绝原因。";
    renderApp();
    return;
  }
  if (!window.confirm("确认拒绝该 KYB 申请？")) return;

  const previousKybStatus = entity.kybStatus;
  const previousActivationStatus = entity.activationStatus;
  entity.kybStatus = "rejected";
  entity.activationStatus = "已暂停";
  entity.history.unshift(
    createEntityHistoryRecord({
      actor: currentOps,
      action: "拒绝申请",
      detail: `拒绝原因：${reason}`,
      context: {
        workflow: "KYB 决策",
      },
      changes: [
        {
          field: "kyb_status",
          before: previousKybStatus || "审核中",
          after: entity.kybStatus,
        },
        {
          field: "激活状态",
          before: previousActivationStatus || "KYB 进行中",
          after: entity.activationStatus,
        },
      ],
    })
  );
  entity.decisionDraft.approvalRequest = null;
  pageFlashMessage = "已拒绝申请，系统将通知商户并写入审计日志。";
  renderApp();
}

function submitEntityApproval(entityId) {
  const entity = getEntityById(entityId);
  if (!entity) return;
  const summary = getEntityMaterialsSummary(entity);
  if (summary.doneCount < summary.total) {
    pageFlashMessage = `还有 ${summary.total - summary.doneCount} 项材料待审核`;
    renderApp();
    return;
  }
  if (entity.systemChecks.sanction === "命中") {
    pageFlashMessage = "制裁筛查命中，仅可执行拒绝申请。";
    renderApp();
    return;
  }
  if (!window.confirm("确认提交审批？将触发双人审核流程。")) return;

  const previousApprovalState = entity.decisionDraft.approvalRequest ? "已提交" : "未提交";
  entity.decisionDraft.approvalRequest = {
    submittedBy: currentOps,
    submittedAt: new Date().toISOString(),
  };
  entity.history.unshift(
    createEntityHistoryRecord({
      actor: currentOps,
      action: "提交审批",
      detail: entity.decisionDraft.manualComment || "待第二位 Ops 确认",
      context: {
        workflow: "双人审核",
        submittedBy: currentOps,
      },
      changes: [
        {
          field: "审批状态",
          before: previousApprovalState,
          after: "待二审确认",
        },
      ],
    })
  );
  pageFlashMessage = "已提交审批，请由另一位 Ops 完成审批确认。";
  renderApp();
}

function confirmEntityApproval(entityId) {
  const entity = getEntityById(entityId);
  if (!entity || !entity.decisionDraft.approvalRequest) return;
  const approver = entity.decisionDraft.secondApprover;
  if (!approver) {
    pageFlashMessage = "请选择审批确认人。";
    renderApp();
    return;
  }
  if (approver === entity.decisionDraft.approvalRequest.submittedBy || approver === currentOps) {
    pageFlashMessage = "防自审机制：提交人和确认人必须不同。";
    renderApp();
    return;
  }

  const previousKybStatus = entity.kybStatus;
  const previousActivationStatus = entity.activationStatus;
  const submittedBy = entity.decisionDraft.approvalRequest.submittedBy;
  entity.kybStatus = "active";
  entity.activationStatus = "已激活";
  entity.history.unshift(
    createEntityHistoryRecord({
      actor: approver,
      action: "批准通过",
      detail: `审核意见：${entity.decisionDraft.manualComment || "通过"}；初始风险评级：${
        entity.decisionDraft.riskRating || "中风险"
      }`,
      context: {
        workflow: "双人审核",
        submittedBy,
        approvedBy: approver,
      },
      changes: [
        {
          field: "kyb_status",
          before: previousKybStatus || "审核中",
          after: entity.kybStatus,
        },
        {
          field: "激活状态",
          before: previousActivationStatus || "KYB 进行中",
          after: entity.activationStatus,
        },
      ],
    })
  );
  entity.decisionDraft.approvalRequest = null;
  pageFlashMessage = "双人审核完成：kyb_status 已更新为 active，并已触发账户开立流程。";
  renderApp();
}

function openTaskInMerchantDetail(taskId) {
  const task = workbenchTasks.find((item) => item.id === taskId);
  if (!task) return;
  selectedMerchantId = task.merchantId;
  activeMerchantTab = todoTypeToMerchantTab[task.type] || "basic";
  setRoute("merchantDetail");
}

function renderDashboard(container) {
  const myCount = workbenchTasks.filter((task) => task.assignee === currentOps).length;
  const allCount = workbenchTasks.length;
  const rows = getFilteredSortedWorkbenchTasks();
  const allTypes = [...new Set(workbenchTasks.map((item) => item.type))];
  const allLicenses = [...new Set(workbenchTasks.map((item) => item.license))];
  const currentTabLabel = activeWorkbenchTab === "mine" ? "我的待办" : "全部待办";

  container.innerHTML = `
    <section class="workbench-shell">
      <div class="metric-grid">
        <button
          class="metric-card metric-card-mine ${activeWorkbenchTab === "mine" ? "active" : ""}"
          data-workbench-tab="mine"
          title="分配给当前登录 Ops 的未处理任务，点击切换至我的待办列表"
        >
          <span class="metric-title">我的待办</span>
          <span class="metric-value">${myCount}</span>
          <span class="metric-jump">点击查看</span>
        </button>

        <button
          class="metric-card metric-card-all ${activeWorkbenchTab === "all" ? "active" : ""}"
          data-workbench-tab="all"
          title="整个团队所有未处理任务，点击切换至全部待办列表"
        >
          <span class="metric-title">全部待办</span>
          <span class="metric-value">${allCount}</span>
          <span class="metric-jump">点击查看</span>
        </button>
      </div>

      <article class="card workbench-board">
        <div class="workbench-head">
          <div class="workbench-head-left">
            <div class="tabs tabs-strong">
              <button class="tab-btn ${activeWorkbenchTab === "mine" ? "active" : ""}" data-workbench-tab="mine">我的待办</button>
              <button class="tab-btn ${activeWorkbenchTab === "all" ? "active" : ""}" data-workbench-tab="all">全部待办</button>
            </div>
            <span class="result-chip">${currentTabLabel} · ${rows.length} 项</span>
          </div>
          <p class="sort-hint">排序：紧急度降序 + 提交时间升序（默认）</p>
        </div>

        <div class="filter-panel">
          <div class="filter-row">
            <div class="filter-block filter-block-wide">
              <span class="filter-label">类型（多选）</span>
              <div class="checkbox-list checkbox-list-chips">
                ${allTypes
                  .map(
                    (type) =>
                      `<label class="chip-check"><input type="checkbox" data-filter-type="${type}" ${
                        workbenchFilters.types.has(type) ? "checked" : ""
                      } /> <span>${type}</span></label>`
                  )
                  .join("")}
              </div>
            </div>
          </div>

          <div class="filter-row">
            <div class="filter-block">
              <label class="filter-label" for="filter-license">牌照</label>
              <select id="filter-license" class="filter-control">
                <option value="all">全部</option>
                ${allLicenses
                  .map(
                    (license) =>
                      `<option value="${license}" ${workbenchFilters.license === license ? "selected" : ""}>${license}</option>`
                  )
                  .join("")}
              </select>
            </div>

            <div class="filter-block">
              <label class="filter-label" for="filter-urgency">紧急度</label>
              <select id="filter-urgency" class="filter-control">
                <option value="all" ${workbenchFilters.urgency === "all" ? "selected" : ""}>全部</option>
                <option value="high" ${workbenchFilters.urgency === "high" ? "selected" : ""}>高</option>
                <option value="medium" ${workbenchFilters.urgency === "medium" ? "selected" : ""}>中</option>
                <option value="low" ${workbenchFilters.urgency === "low" ? "selected" : ""}>低</option>
              </select>
            </div>

            <div class="filter-block filter-block-date">
              <label class="filter-label" for="filter-start-date">提交时间范围</label>
              <div class="date-range-row">
                <input id="filter-start-date" class="filter-control" type="date" value="${workbenchFilters.startDate}" />
                <span>至</span>
                <input id="filter-end-date" class="filter-control" type="date" value="${workbenchFilters.endDate}" />
              </div>
            </div>

            <div class="filter-block filter-block-action">
              <button id="reset-filters" class="tab-btn">重置筛选</button>
            </div>
          </div>
        </div>

        ${renderTodoTable(rows)}
      </article>
    </section>
  `;
}

function renderTodoTable(rows) {
  if (!rows.length) {
    return '<p style="margin-top:12px;">当前筛选条件下暂无待办。</p>';
  }

  return `
    <div class="table-wrap">
      <table class="todo-table">
        <thead>
          <tr>
            <th>类型</th>
            <th>商户名称</th>
            <th>牌照</th>
            <th>提交时间</th>
            <th>紧急度</th>
            ${activeWorkbenchTab === "all" ? "<th>当前处理人</th>" : ""}
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          ${rows
            .map((task) => {
              const merchant = getMerchant(task.merchantId);
              const urgency = getUrgency(task.submittedAt);
              const urgencyLabel = urgencyToLabel(urgency);
              const assigneeText = task.assignee ? `已分配（${task.assignee}）` : "未分配";
              const assigneeClass = task.assignee ? "assignee assigned" : "assignee unassigned";
              return `
                <tr>
                  <td><span class="type-pill type-${typeToken(task.type)}">${task.type}</span></td>
                  <td>
                    <button class="link-btn" data-open-merchant="${task.id}">${escapeHtml(merchant.name)}</button>
                  </td>
                  <td>${task.license}</td>
                  <td>
                    <span title="${formatExactTime(task.submittedAt)}">${formatRelativeTime(task.submittedAt)}</span>
                  </td>
                  <td><span class="tag ${urgencyToTagClass(urgency)}">${urgencyLabel}</span></td>
                  ${activeWorkbenchTab === "all" ? `<td><span class="${assigneeClass}">${assigneeText}</span></td>` : ""}
                  <td><button class="tab-btn action-btn" data-open-task="${task.id}">处理</button></td>
                </tr>
              `;
            })
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function getFilteredSortedWorkbenchTasks() {
  let pool = [...workbenchTasks];

  if (activeWorkbenchTab === "mine") {
    pool = pool.filter((task) => task.assignee === currentOps);
  }

  if (workbenchFilters.types.size > 0) {
    pool = pool.filter((task) => workbenchFilters.types.has(task.type));
  }

  if (workbenchFilters.license !== "all") {
    pool = pool.filter((task) => task.license === workbenchFilters.license);
  }

  if (workbenchFilters.urgency !== "all") {
    pool = pool.filter((task) => getUrgency(task.submittedAt) === workbenchFilters.urgency);
  }

  if (workbenchFilters.startDate) {
    const start = new Date(`${workbenchFilters.startDate}T00:00:00`);
    pool = pool.filter((task) => new Date(task.submittedAt) >= start);
  }

  if (workbenchFilters.endDate) {
    const end = new Date(`${workbenchFilters.endDate}T23:59:59`);
    pool = pool.filter((task) => new Date(task.submittedAt) <= end);
  }

  pool.sort((a, b) => {
    const urgencyDiff = urgencyRank(getUrgency(b.submittedAt)) - urgencyRank(getUrgency(a.submittedAt));
    if (urgencyDiff !== 0) return urgencyDiff;
    return new Date(a.submittedAt) - new Date(b.submittedAt);
  });

  return pool;
}

function getMerchant(merchantId) {
  return (
    merchants.find((item) => item.id === merchantId) || {
      id: merchantId,
      name: merchantId,
      licenses: ["-"],
      customerProfileId: "-",
    }
  );
}

function getUrgency(submittedAt) {
  const businessDays = getBusinessDaysElapsed(new Date(submittedAt), new Date());
  if (businessDays > 2) return "high";
  if (businessDays >= 1) return "medium";
  return "low";
}

function getBusinessDaysElapsed(start, end) {
  if (end <= start) return 0;

  let ms = 0;
  let cursor = new Date(start);

  while (cursor < end) {
    const dayStart = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate(), 0, 0, 0, 0);
    const dayEnd = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate(), 23, 59, 59, 999);
    const rangeEnd = dayEnd < end ? dayEnd : end;
    const day = cursor.getDay();
    const isBusinessDay = day !== 0 && day !== 6;

    if (isBusinessDay) {
      ms += rangeEnd - cursor;
    }

    cursor = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);
  }

  return ms / (24 * 60 * 60 * 1000);
}

function urgencyRank(urgency) {
  return { high: 3, medium: 2, low: 1 }[urgency] || 0;
}

function urgencyToLabel(urgency) {
  return { high: "高", medium: "中", low: "低" }[urgency] || "低";
}

function urgencyToTagClass(urgency) {
  return { high: "danger", medium: "warning", low: "success" }[urgency] || "success";
}

function typeToken(type) {
  return type
    .replace(/\s+/g, "-")
    .replace(/[^\u4e00-\u9fa5a-zA-Z0-9-]/g, "")
    .toLowerCase();
}

function formatRelativeTime(dateStr) {
  const now = new Date();
  const target = new Date(dateStr);
  const diffMs = now - target;
  const mins = Math.floor(diffMs / (60 * 1000));
  const hours = Math.floor(diffMs / (60 * 60 * 1000));
  const days = Math.floor(diffMs / (24 * 60 * 60 * 1000));

  if (mins < 60) return `${Math.max(mins, 1)}分钟前`;
  if (hours < 24) return `${hours}小时前`;
  return `${days}天前`;
}

function formatExactTime(dateStr) {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function getDateRangeByPreset(preset) {
  const today = new Date();
  const endDate = toDateInputValue(today);

  if (preset === "7d") {
    return { startDate: toDateInputValue(new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)), endDate };
  }
  if (preset === "30d") {
    return { startDate: toDateInputValue(new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)), endDate };
  }
  if (preset === "90d") {
    return { startDate: toDateInputValue(new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000)), endDate };
  }
  return { startDate: "", endDate: "" };
}

function toDateInputValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function renderMerchantList(container) {
  const rows = getFilteredSortedMerchants();
  const sortArrowName = merchantSort.field === "name" ? (merchantSort.direction === "asc" ? "↑" : "↓") : "";
  const sortArrowOnboarded =
    merchantSort.field === "onboardedAt" ? (merchantSort.direction === "asc" ? "↑" : "↓") : "";
  const customRange = merchantFilters.datePreset === "custom";

  container.innerHTML = `
    <section class="merchant-search-shell">
      <article class="card merchant-search-card">
        <div class="merchant-search-top">
          <div>
            <h3>商户搜索</h3>
          </div>
          <button class="tab-btn active" id="open-new-merchant">＋ 新建商户</button>
        </div>

        <div class="merchant-search-controls">
          <div class="merchant-search-input-wrap">
            <input
              id="merchant-search-input"
              class="merchant-search-input"
              type="search"
              placeholder="搜索商户名称 / 注册号 / Admin 邮箱 / CustomerProfile ID"
              value="${escapeHtml(merchantSearchInput)}"
            />
          </div>

          <div class="merchant-filter-grid">
            <label>
              <span class="filter-label">牌照</span>
              <select id="merchant-filter-license" class="filter-control">
                <option value="all" ${merchantFilters.license === "all" ? "selected" : ""}>全部</option>
                ${licenseOptions
                  .map((item) => `<option value="${item}" ${merchantFilters.license === item ? "selected" : ""}>${item}</option>`)
                  .join("")}
              </select>
            </label>

            <label>
              <span class="filter-label">合规状态</span>
              <select id="merchant-filter-compliance" class="filter-control">
                <option value="all" ${merchantFilters.complianceStatus === "all" ? "selected" : ""}>全部</option>
                ${complianceStatusOptions
                  .map(
                    (item) =>
                      `<option value="${item}" ${merchantFilters.complianceStatus === item ? "selected" : ""}>${item}</option>`
                  )
                  .join("")}
              </select>
            </label>

            <label>
              <span class="filter-label">KYB 状态</span>
              <select id="merchant-filter-kyb" class="filter-control">
                <option value="all" ${merchantFilters.kybStatus === "all" ? "selected" : ""}>全部</option>
                ${kybStatusOptions
                  .map((item) => `<option value="${item}" ${merchantFilters.kybStatus === item ? "selected" : ""}>${item}</option>`)
                  .join("")}
              </select>
            </label>

            <label>
              <span class="filter-label">入驻时间</span>
              <select id="merchant-filter-date-preset" class="filter-control">
                <option value="all" ${merchantFilters.datePreset === "all" ? "selected" : ""}>全部</option>
                <option value="7d" ${merchantFilters.datePreset === "7d" ? "selected" : ""}>近 7 天</option>
                <option value="30d" ${merchantFilters.datePreset === "30d" ? "selected" : ""}>近 30 天</option>
                <option value="90d" ${merchantFilters.datePreset === "90d" ? "selected" : ""}>近 90 天</option>
                <option value="custom" ${merchantFilters.datePreset === "custom" ? "selected" : ""}>自定义范围</option>
              </select>
            </label>
          </div>

          <div class="merchant-date-row ${customRange ? "" : "disabled"}">
            <input id="merchant-filter-start-date" class="filter-control" type="date" value="${merchantFilters.startDate}" ${
    customRange ? "" : "disabled"
  } />
            <span>至</span>
            <input id="merchant-filter-end-date" class="filter-control" type="date" value="${merchantFilters.endDate}" ${
    customRange ? "" : "disabled"
  } />
            <button id="merchant-clear-filters" class="tab-btn">清除筛选</button>
          </div>
        </div>

        ${
          rows.length
            ? `
          <div class="table-wrap" style="margin-top:12px;">
            <table class="merchant-table">
              <thead>
                <tr>
                  <th class="sortable" data-merchant-sort="name">商户名称 ${sortArrowName}</th>
                  <th>CustomerProfile ID</th>
                  <th>牌照</th>
                  <th>合规状态</th>
                  <th>KYB 状态</th>
                  <th class="sortable" data-merchant-sort="onboardedAt">入驻时间 ${sortArrowOnboarded}</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                ${rows
                  .map(
                    (merchant) => `
                    <tr>
                      <td>
                        <button class="link-btn" data-open-merchant-detail="${merchant.id}">${escapeHtml(merchant.name)}</button>
                      </td>
                      <td>${escapeHtml(merchant.customerProfileId)}</td>
                      <td>
                        <div class="license-tags">${merchant.licenses
                          .map((license) => `<span class="mini-tag">${escapeHtml(license)}</span>`)
                          .join("")}</div>
                      </td>
                      <td><span class="status-dot ${complianceClass(merchant.complianceStatus)}">${escapeHtml(merchant.complianceStatus)}</span></td>
                      <td>${escapeHtml(merchant.kybStatus)}</td>
                      <td>${formatDate(merchant.onboardedAt)}</td>
                      <td><button class="tab-btn" data-open-merchant-detail="${merchant.id}">查看</button></td>
                    </tr>
                  `
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        `
            : `
          <div class="merchant-empty-state">
            <p>未找到匹配商户，请检查搜索内容或筛选条件</p>
            <button id="merchant-clear-empty" class="tab-btn">清除筛选</button>
          </div>
        `
        }
      </article>

      ${merchantDrawerOpen ? renderCreateMerchantDrawer() : ""}
    </section>
  `;
}

function renderCreateMerchantDrawer() {
  return `
    <div class="drawer-mask" id="merchant-drawer-mask"></div>
    <aside class="drawer">
      <div class="drawer-head">
        <h3>新建商户</h3>
        <button class="tab-btn" id="close-merchant-drawer">关闭</button>
      </div>

      ${merchantDrawerError ? `<div class="drawer-error">${merchantDrawerError}</div>` : ""}

      <form id="merchant-create-form" class="drawer-form">
        <label>
          <span>商户名称（英文）*</span>
          <input id="create-legal-name" class="filter-control" value="${escapeHtml(newMerchantForm.legalName)}" required />
        </label>

        <label>
          <span>商户名称（本地文字）</span>
          <input id="create-local-name" class="filter-control" value="${escapeHtml(newMerchantForm.localName)}" />
        </label>

        <label>
          <span>注册地（司法管辖区）*</span>
          <select id="create-jurisdiction" class="filter-control" required>
            <option value="">请选择</option>
            ${jurisdictionOptions
              .map((item) => `<option value="${item}" ${newMerchantForm.jurisdiction === item ? "selected" : ""}>${item}</option>`)
              .join("")}
          </select>
        </label>

        <label>
          <span>主联系人邮箱*</span>
          <input id="create-admin-email" class="filter-control" type="email" value="${escapeHtml(newMerchantForm.adminEmail)}" required />
        </label>

        <label>
          <span>所属集团</span>
          <input id="create-enterprise-group" class="filter-control" list="group-options" value="${escapeHtml(
            newMerchantForm.enterpriseGroup
          )}" />
          <datalist id="group-options">
            ${groupOptions.map((item) => `<option value="${item}"></option>`).join("")}
          </datalist>
        </label>

        <div class="drawer-group">
          <span>目标牌照*</span>
          <div class="license-checkbox-list">
            ${licenseOptions
              .map(
                (license) =>
                  `<label class="license-option"><input type="checkbox" data-create-license="${license}" ${
                    newMerchantForm.targetLicenses.has(license) ? "checked" : ""
                  } /> ${license}</label>`
              )
              .join("")}
          </div>
        </div>

        <label>
          <span>负责 RM</span>
          <select id="create-rm" class="filter-control">
            <option value="">请选择</option>
            ${rmOptions.map((item) => `<option value="${item}" ${newMerchantForm.rm === item ? "selected" : ""}>${item}</option>`).join("")}
          </select>
        </label>

        <label>
          <span>备注</span>
          <textarea id="create-notes" class="filter-control" rows="3">${escapeHtml(newMerchantForm.notes)}</textarea>
        </label>

        <button type="submit" class="tab-btn active">创建 CustomerProfile</button>
      </form>
    </aside>
  `;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function complianceClass(status) {
  if (status === "正常") return "green";
  if (status === "受限") return "orange";
  return "red";
}

function getFilteredSortedMerchants() {
  let pool = [...merchants];

  if (merchantSearchKeyword) {
    pool = pool.filter((merchant) => {
      const source = [
        merchant.name,
        merchant.localName,
        merchant.registrationNo,
        merchant.adminEmail,
        merchant.customerProfileId,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return source.includes(merchantSearchKeyword);
    });
  }

  if (merchantFilters.license !== "all") {
    pool = pool.filter((merchant) => merchant.licenses.includes(merchantFilters.license));
  }

  if (merchantFilters.complianceStatus !== "all") {
    pool = pool.filter((merchant) => merchant.complianceStatus === merchantFilters.complianceStatus);
  }

  if (merchantFilters.kybStatus !== "all") {
    pool = pool.filter((merchant) => merchant.kybStatus === merchantFilters.kybStatus);
  }

  if (merchantFilters.startDate) {
    const start = new Date(`${merchantFilters.startDate}T00:00:00`);
    pool = pool.filter((merchant) => new Date(merchant.onboardedAt) >= start);
  }

  if (merchantFilters.endDate) {
    const end = new Date(`${merchantFilters.endDate}T23:59:59`);
    pool = pool.filter((merchant) => new Date(merchant.onboardedAt) <= end);
  }

  pool.sort((a, b) => {
    let valueA;
    let valueB;

    if (merchantSort.field === "name") {
      valueA = a.name.toLowerCase();
      valueB = b.name.toLowerCase();
      if (valueA < valueB) return merchantSort.direction === "asc" ? -1 : 1;
      if (valueA > valueB) return merchantSort.direction === "asc" ? 1 : -1;
      return 0;
    }

    valueA = new Date(a.onboardedAt).getTime();
    valueB = new Date(b.onboardedAt).getTime();
    return merchantSort.direction === "asc" ? valueA - valueB : valueB - valueA;
  });

  return pool;
}

function renderMerchantDetail(container) {
  const currentMerchant = getMerchant(selectedMerchantId);
  syncMerchantDetailDrafts(currentMerchant);

  container.innerHTML = `
    <section class="merchant-layout">
      <article class="card">
        <div class="section-actions" style="margin-bottom:10px;">
          <button class="tab-btn" data-back-merchant-list>← 返回商户列表</button>
        </div>
        ${renderMerchantHeader(currentMerchant)}
        <div class="tabs">
          ${merchantDetailTabs
            .map(
              (tab) =>
                `<button class="tab-btn ${activeMerchantTab === tab.id ? "active" : ""}" data-tab="${tab.id}">${tab.label}</button>`
            )
            .join("")}
        </div>
        ${renderMerchantTabContent(activeMerchantTab, currentMerchant)}
      </article>
    </section>
  `;
}

function renderMerchantHeader(merchant) {
  return `
    <section class="merchant-header">
      <div class="merchant-header-top">
        <h3>${escapeHtml(merchant.name)}</h3>
        <span class="status-dot ${complianceClass(merchant.complianceStatus)}">${escapeHtml(merchant.complianceStatus)}</span>
      </div>
      <div class="merchant-header-meta">
        <span><strong>CustomerProfile ID：</strong>${escapeHtml(merchant.customerProfileId)}</span>
        <span><strong>注册地：</strong>${escapeHtml(merchant.jurisdiction)}</span>
        <span><strong>入驻时间：</strong>${formatDate(merchant.onboardedAt)}</span>
      </div>
      <div class="license-tags">
        ${merchant.licenses.map((license) => `<span class="mini-tag">${escapeHtml(license)}</span>`).join("")}
      </div>
    </section>
  `;
}

function renderMerchantTabContent(tabId, merchant) {
  if (tabId === "basic") {
    return renderMerchantBasicTab(merchant);
  }
  if (tabId === "kyb") {
    return renderMerchantKybTab(merchant);
  }
  if (tabId === "compliance") {
    return renderMerchantComplianceTab(merchant);
  }
  if (tabId === "contracts") {
    return renderMerchantContractsTab(merchant);
  }
  if (tabId === "accounts") {
    return renderMerchantAccountsTab(merchant);
  }
  if (tabId === "members") {
    return renderMerchantMembersTab(merchant);
  }
  return "";
}

function renderMerchantBasicTab(merchant) {
  const profileAuditPreview = merchant.profileAuditLogs.slice(0, 3);
  const teamAuditPreview = merchant.teamAuditLogs.slice(0, 3);
  const notes = showAllInternalNotes ? merchant.internalNotes : merchant.internalNotes.slice(0, 3);
  const hasMoreNotes = merchant.internalNotes.length > 3;
  const selectedLicenseExists = merchant.legalEntities.some((entity) => entity.licenseName === addLicenseSelected);

  return `
    <section class="merchant-tab-grid">
      <article class="card">
        <div class="section-head">
          <h4>客户档案</h4>
          ${
            merchantProfileEditing
              ? `<div class="section-actions"><button class="tab-btn" id="profile-cancel-btn">取消</button><button class="tab-btn active" id="profile-save-btn">保存</button></div>`
              : `<button class="tab-btn" id="profile-edit-btn">编辑</button>`
          }
        </div>
        <div class="profile-grid">
          <div><span>法定名称（英文）</span><strong>${escapeHtml(merchant.name)}</strong></div>
          <div><span>法定名称（本地文字）</span>${
            merchantProfileEditing
              ? `<input id="profile-local-name" class="filter-control" value="${escapeHtml(merchantProfileDraft.localName)}" />`
              : `<strong>${escapeHtml(merchant.localName || "-")}</strong>`
          }</div>
          <div><span>注册号</span><strong>${escapeHtml(merchant.registrationNo)}</strong></div>
          <div><span>注册地</span><strong>${escapeHtml(merchant.jurisdiction)}</strong></div>
          <div><span>实际经营地</span>${
            merchantProfileEditing
              ? `<input id="profile-operating-region" class="filter-control" value="${escapeHtml(
                  merchantProfileDraft.operatingRegion
                )}" />`
              : `<strong>${escapeHtml(merchant.actualOperatingRegion || "-")}</strong>`
          }</div>
          <div><span>主营业务描述</span>${
            merchantProfileEditing
              ? `<input id="profile-business-description" class="filter-control" value="${escapeHtml(
                  merchantProfileDraft.businessDescription
                )}" />`
              : `<strong>${escapeHtml(merchant.businessDescription || "-")}</strong>`
          }</div>
          <div><span>CustomerProfile ID</span><strong>${escapeHtml(merchant.customerProfileId)}</strong></div>
          <div><span>所属集团</span>${
            merchantProfileEditing
              ? `<input id="profile-enterprise-group" class="filter-control" value="${escapeHtml(
                  merchantProfileDraft.enterpriseGroup
                )}" />`
              : `<strong>${escapeHtml(merchant.enterpriseGroup || "-")}</strong>`
          } ${
    merchant.enterpriseGroup
      ? `<button class="link-btn" id="group-jump-btn" data-group-name="${escapeHtml(merchant.enterpriseGroup)}">跳转 →</button>`
      : ""
  }</div>
          <div><span>创建时间 / 创建人</span><strong>${formatExactTime(merchant.createdAt)} / ${escapeHtml(merchant.createdBy)}</strong></div>
        </div>
      </article>

      <article class="card">
        <div class="section-head">
          <h4>入驻牌照</h4>
          <button class="tab-btn" id="open-add-license-drawer">＋ 追加入驻新牌照</button>
        </div>
        <div class="license-entity-table">
          ${merchant.legalEntities
            .map(
              (entity) => `
              <div class="license-entity-row">
                <span>${escapeHtml(entity.licenseName)}</span>
                <span>${escapeHtml(entity.activationStatus)}</span>
                <span>${escapeHtml(entity.id)}</span>
                <button class="link-btn" data-license-jump="${escapeHtml(entity.id)}">跳转 →</button>
              </div>
            `
            )
            .join("")}
        </div>

        ${
          addLicenseDrawerOpen
            ? `
          <div class="inline-drawer">
            <h5>追加入驻新牌照</h5>
            ${addLicenseError ? `<p class="drawer-error">${addLicenseError}</p>` : ""}
            <label>
              <span>目标牌照</span>
              <select id="add-license-select" class="filter-control">
                <option value="">请选择</option>
                ${licenseOptions.map((license) => `<option value="${license}" ${addLicenseSelected === license ? "selected" : ""}>${license}</option>`).join("")}
              </select>
            </label>
            ${
              addLicenseSelected
                ? selectedLicenseExists
                  ? `<p class="drawer-error">该商户已在此牌照下入驻</p>`
                  : `
                <div>
                  <span>Document Vault 可复用材料</span>
                  <div class="checkbox-list" style="margin-top:6px;">
                    ${merchant.documentVaultMaterials
                      .map(
                        (doc) =>
                          `<label><input type="checkbox" data-reuse-doc="${escapeHtml(doc)}" ${
                            addLicenseReuseDocs.has(doc) ? "checked" : ""
                          } /> ${escapeHtml(doc)}</label>`
                      )
                      .join("")}
                  </div>
                </div>
              `
                : ""
            }
            <div class="section-actions">
              <button class="tab-btn" id="close-add-license-drawer">取消</button>
              <button class="tab-btn active" id="submit-add-license">创建入驻关系</button>
            </div>
          </div>
        `
            : ""
        }
      </article>

      <article class="card">
        <div class="section-head">
          <h4>负责团队</h4>
          ${
            merchantTeamEditing
              ? `<div class="section-actions"><button class="tab-btn" id="team-cancel-btn">取消</button><button class="tab-btn active" id="team-save-btn">保存</button></div>`
              : `<button class="tab-btn" id="team-edit-btn">编辑</button>`
          }
        </div>
        ${
          merchantTeamEditing
            ? `
          <label>
            <span>RM</span>
            <select id="team-rm-select" class="filter-control">
              <option value="">请选择</option>
              ${rmOptions.map((item) => `<option value="${item}" ${merchantTeamDraft.rm === item ? "selected" : ""}>${item}</option>`).join("")}
            </select>
          </label>
        `
            : `<p><strong>RM：</strong>${escapeHtml(merchant.rm || "-")}</p>`
        }
      </article>

      <article class="card">
        <h4>内部备注</h4>
        <div class="note-input-row">
          <textarea id="internal-note-input" class="filter-control" rows="3" placeholder="输入内部备注（仅运营可见）"></textarea>
          <button class="tab-btn" id="internal-note-submit">提交备注</button>
        </div>
        <div class="note-list">
          ${
            notes.length
              ? notes
                  .map(
                    (note) => `
                    <div class="note-item">
                      <p>${formatExactTime(note.at)} · ${escapeHtml(note.operator)}</p>
                      <strong>${escapeHtml(note.content)}</strong>
                    </div>
                  `
                  )
                  .join("")
              : "<p>暂无内部备注</p>"
          }
        </div>
        ${
          hasMoreNotes
            ? `<button id="internal-note-toggle" class="link-btn">${showAllInternalNotes ? "收起" : "查看全部"}</button>`
            : ""
        }
      </article>

      <article class="card">
        <h4>审计日志（最近）</h4>
        <div class="audit-log-list">
          ${renderAuditLogs(profileAuditPreview, "客户档案")}
          ${renderAuditLogs(teamAuditPreview, "负责团队")}
        </div>
      </article>
    </section>
  `;
}

function renderAuditLogs(logs, scope) {
  if (!logs.length) return `<p>${scope}暂无审计记录</p>`;
  return logs
    .map(
      (log) => `
      <div class="audit-item">
        <p>${formatExactTime(log.at)} · ${escapeHtml(log.operator)} · ${escapeHtml(log.action)}</p>
        <strong>${escapeHtml(log.beforeValue)} → ${escapeHtml(log.afterValue)}</strong>
      </div>
    `
    )
    .join("");
}

function renderMerchantKybTab(merchant) {
  ensureKybExpansionState(merchant);
  const modalEntity = merchant.legalEntities.find((item) => item.id === kybHistoryModalEntityId) || null;
  const modalRecord =
    modalEntity && kybHistoryModalAt ? modalEntity.history.find((item) => item.at === kybHistoryModalAt) || null : null;

  return `
    <section>
      <h4>入驻与 KYB</h4>
      <div class="kyb-license-blocks">
        ${merchant.legalEntities
          .map((entity) => {
            const expanded = kybExpandedEntityIds.has(entity.id);
            const activeSubTab = kybSubTabByEntity[entity.id] || "config";
            return `
            <article class="card kyb-license-block ${kybFocusEntityId === entity.id ? "focused" : ""}">
              <div class="kyb-license-head">
                <div>
                  <h5>${escapeHtml(entity.licenseName)} · ${escapeHtml(entity.id)}</h5>
                  <p>kyb_status: ${escapeHtml(entity.kybStatus)} · 激活状态: ${escapeHtml(entity.activationStatus)}</p>
                </div>
                <button class="tab-btn" data-kyb-entity-toggle="${escapeHtml(entity.id)}">${expanded ? "折叠" : "展开"}</button>
              </div>

              ${
                expanded
                  ? `
                <div class="tabs tabs-strong">
                  ${[
                    ["config", "入驻配置"],
                    ["materials", "KYB 材料"],
                    ["decision", "审核决策"],
                    ["history", "审核历史"],
                  ]
                    .map(
                      ([tabId, label]) =>
                        `<button class="tab-btn ${activeSubTab === tabId ? "active" : ""}" data-kyb-subtab="${tabId}" data-entity-id="${escapeHtml(
                          entity.id
                        )}">${label}</button>`
                    )
                    .join("")}
                </div>
                <div class="kyb-subtab-content">
                  ${
                    activeSubTab === "config"
                      ? renderKybConfigSubTab(merchant, entity)
                      : activeSubTab === "materials"
                        ? renderKybMaterialsSubTab(merchant, entity)
                        : activeSubTab === "decision"
                          ? renderKybDecisionSubTab(entity)
                          : renderKybHistorySubTab(entity)
                  }
                </div>
              `
                  : ""
              }
            </article>
          `;
          })
          .join("")}
      </div>
      ${modalEntity && modalRecord ? renderHistoryModal(modalEntity, modalRecord) : ""}
    </section>
  `;
}

function renderMerchantComplianceTab(merchant) {
  ensureComplianceExpansionState(merchant);
  const sharedStats = getSharedComplianceStats(merchant.sharedComplianceFiles || []);
  const sharedRows = complianceSharedShowAll ? merchant.sharedComplianceFiles : merchant.sharedComplianceFiles.slice(0, 6);
  const reviewEntity =
    complianceReviewEntityId && complianceReviewEntityId !== "shared" ? getEntityById(complianceReviewEntityId) : null;
  const reviewFile = getComplianceReviewFile(merchant);

  return `
    <section class="merchant-tab-grid">
      <article class="card compliance-shared-card ${complianceSharedFocus ? "focused" : ""}" id="compliance-shared-vault">
        <div class="section-head">
          <div>
            <h4>共享文件库（CustomerProfile 级）</h4>
            <p class="section-sub">跨牌照共享的 KYB 材料，入驻各牌照时可复用</p>
          </div>
          <button class="link-btn" data-compliance-jump-shared>管理文件 →</button>
        </div>
        <p class="compliance-summary-meta">共 ${merchant.sharedComplianceFiles.length} 份文件 · ${sharedStats.expiringSoon} 份即将到期</p>
        <div class="compliance-file-table">
          <div class="compliance-file-row compliance-file-head">
            <span>文件类型</span><span>文件名</span><span>有效期</span><span>状态</span><span>操作</span>
          </div>
          ${sharedRows
            .map((file) => {
              const state = resolveComplianceFileState(file.status, file.expiryDate);
              return `
                <div class="compliance-file-row">
                  <span>${escapeHtml(file.fileType)}</span>
                  <button class="link-btn" data-compliance-open-file="${escapeHtml(file.id)}" data-compliance-source="shared">${escapeHtml(file.fileName)}</button>
                  <span>${formatExpiryLabel(file.expiryDate)}</span>
                  <span>${renderComplianceStatusPill(state)}</span>
                  <div class="section-actions">
                    <button class="link-btn" data-compliance-open-file="${escapeHtml(file.id)}" data-compliance-source="shared">查看</button>
                    <button class="link-btn" data-compliance-replace-file="${escapeHtml(file.id)}" data-compliance-source="shared">替换</button>
                    <button class="link-btn" data-compliance-toggle-history="${escapeHtml(file.id)}">${
                      complianceSharedHistoryFileId === file.id ? "收起历史" : "查看历史"
                    }</button>
                  </div>
                </div>
                ${
                  complianceSharedHistoryFileId === file.id
                    ? renderComplianceVersionHistory(file)
                    : ""
                }
              `;
            })
            .join("")}
        </div>
        ${
          merchant.sharedComplianceFiles.length > 6
            ? `<button class="link-btn" data-compliance-shared-toggle-all>${complianceSharedShowAll ? "收起" : "查看全部 →"}</button>`
            : ""
        }
        ${
          sharedStats.expiringSoon > 0
            ? `<p class="drawer-error">⚠ ${sharedStats.expiringSoon} 份文件将在 60 天内到期，请提醒商户更新</p>`
            : ""
        }
        <div class="section-actions">
          <button class="tab-btn" data-compliance-upload-shared>＋ 上传新文件</button>
        </div>
      </article>

      <section class="kyb-license-blocks">
        ${merchant.legalEntities
          .map((entity) => {
            const expanded = complianceExpandedEntityIds.has(entity.id);
            const activeSubTab = complianceSubTabByEntity[entity.id] || "overview";
            const profile = entity.complianceProfile;
            const pendingCount = entity.complianceFiles.filter((x) => resolveComplianceFileState(x.status, x.expiryDate) === "待审核").length;
            const abnormal =
              profile.complianceStatus.includes("受限") || profile.complianceStatus.includes("暂停") || merchant.complianceStatus !== "正常";
            return `
              <article class="card kyb-license-block ${abnormal ? "compliance-abnormal" : ""}">
                <div class="kyb-license-head">
                  <div>
                    <h5>${escapeHtml(entity.licenseName)} · ${renderComplianceStatusDot(profile.complianceStatus)}</h5>
                    <p class="inline-meta-tags">
                      <span class="mini-tag">待审核文件 ${pendingCount}</span>
                      ${renderRiskRatingTag(profile.riskRating)}
                    </p>
                  </div>
                  <button class="tab-btn" data-compliance-entity-toggle="${escapeHtml(entity.id)}">${expanded ? "折叠" : "展开"}</button>
                </div>
                ${
                  expanded
                    ? `
                  <div class="tabs tabs-strong">
                    ${[
                      ["overview", "合规概览"],
                      ["files", "文件管理"],
                      ["reviews", "复审历史"],
                    ]
                      .map(
                        ([tabId, label]) =>
                          `<button class="tab-btn ${activeSubTab === tabId ? "active" : ""}" data-compliance-subtab="${tabId}" data-entity-id="${escapeHtml(
                            entity.id
                          )}">${label}</button>`
                      )
                      .join("")}
                  </div>
                  <div class="kyb-subtab-content">
                    ${
                      activeSubTab === "overview"
                        ? renderComplianceOverviewSubTab(entity)
                        : activeSubTab === "files"
                          ? renderComplianceFilesSubTab(merchant, entity)
                          : renderComplianceReviewsSubTab(entity)
                    }
                  </div>
                `
                    : ""
                }
              </article>
            `;
          })
          .join("")}
      </section>

      ${
        reviewFile
          ? `
        <aside class="material-review-panel">
          <h5>${complianceReviewEntityId === "shared" ? "共享文件预览" : "文件审核"}</h5>
          ${renderMaterialPreview(reviewFile)}
          <p>文件类型：${escapeHtml(reviewFile.fileType)}</p>
          <p>上传时间：${formatExactTime(reviewFile.uploadedAt)}</p>
          <p>上传方：${escapeHtml(reviewFile.uploadedBy)}</p>
          <p>有效期：${formatExpiryLabel(reviewFile.expiryDate)}</p>
          ${
            complianceReviewEntityId !== "shared" && reviewEntity
              ? `
            <label>
              <span>审核意见（选填）</span>
              <textarea data-compliance-review-comment class="filter-control" rows="3">${escapeHtml(complianceReviewComment)}</textarea>
            </label>
            <div class="section-actions">
              <button class="tab-btn" data-compliance-review-reject data-entity-id="${escapeHtml(reviewEntity.id)}">✗ 拒绝并要求重新上传</button>
              <button class="tab-btn active" data-compliance-review-approve data-entity-id="${escapeHtml(reviewEntity.id)}">✓ 审核通过</button>
            </div>
          `
              : ""
          }
        </aside>
      `
          : ""
      }
    </section>
  `;
}

function ensureComplianceExpansionState(merchant) {
  if (complianceExpandedForMerchantId !== merchant.id) {
    complianceExpandedEntityIds.clear();
    merchant.legalEntities.forEach((entity) => {
      const profile = entity.complianceProfile || {};
      const hasPending = entity.complianceFiles.some((x) => resolveComplianceFileState(x.status, x.expiryDate) === "待审核");
      const abnormal =
        String(profile.complianceStatus || "").includes("受限") ||
        String(profile.complianceStatus || "").includes("暂停") ||
        merchant.complianceStatus !== "正常";
      if (hasPending || abnormal) {
        complianceExpandedEntityIds.add(entity.id);
      }
      if (!complianceSubTabByEntity[entity.id]) complianceSubTabByEntity[entity.id] = "overview";
      if (!complianceFileFilterByEntity[entity.id]) complianceFileFilterByEntity[entity.id] = { fileType: "all", status: "all" };
    });
    complianceExpandedForMerchantId = merchant.id;
    complianceSharedExpanded = true;
    complianceSharedShowAll = false;
    complianceSharedHistoryFileId = "";
    complianceSharedFocus = false;
    complianceReviewEntityId = "";
    complianceReviewFileId = "";
    complianceReviewComment = "";
  }
}

function renderComplianceOverviewSubTab(entity) {
  const p = entity.complianceProfile;
  return `
    <section class="decision-panel compliance-overview">
      <h6>合规状态</h6>
      <div class="decision-grid compact">
        <p>当前状态：${renderComplianceStatusDot(p.complianceStatus)}</p>
        <p>状态原因：${escapeHtml(p.statusReason || "—")}</p>
        <p>最后更新：${formatExactTime(p.statusUpdatedAt)} · ${escapeHtml(p.statusUpdatedBy)}</p>
      </div>

      <h6>风险评级</h6>
      <div class="decision-grid compact">
        <p>当前评级：${renderRiskRatingTag(p.riskRating)}</p>
        <p>评级原因：${escapeHtml(p.riskReason || "—")}</p>
        <p>最后更新：${formatExactTime(p.riskUpdatedAt)} · ${escapeHtml(p.riskUpdatedBy)}</p>
      </div>

      <h6>复审计划</h6>
      <div class="decision-grid compact">
        <p>上次复审：${formatDate(p.lastReviewAt)} · 结论：${escapeHtml(p.lastReviewConclusion)}</p>
        <p>下次复审：${formatDate(p.nextReviewAt)}</p>
      </div>

      ${
        p.enableStablecoin
          ? `
        <h6>链上合规（稳定币）</h6>
        <div class="decision-grid compact">
          <p>KYT 风险评分：${escapeHtml(String(p.kytScore))} / 100（低风险）</p>
          <p>评分来源：${escapeHtml(p.kytProvider)}</p>
          <p>最后更新：${formatDate(p.kytUpdatedAt)}</p>
        </div>
      `
          : ""
      }

      ${
        p.hasSarFlag
          ? `
        <h6>⚠ 注意事项</h6>
        <div class="decision-grid compact">
          <p>该商户有 SAR 标记记录（仅 MLRO 可见，详情请联系合规负责人）</p>
        </div>
      `
          : ""
      }
    </section>
  `;
}

function renderComplianceFilesSubTab(merchant, entity) {
  const filter = complianceFileFilterByEntity[entity.id] || { fileType: "all", status: "all" };
  const fileTypes = [...new Set(entity.complianceFiles.map((item) => item.fileType))];
  const filteredExclusive = entity.complianceFiles.filter((file) => {
    const state = resolveComplianceFileState(file.status, file.expiryDate);
    const typePass = filter.fileType === "all" || file.fileType === filter.fileType;
    const statusPass = filter.status === "all" || state === filter.status;
    return typePass && statusPass;
  });

  return `
    <section class="decision-panel">
      <div class="filter-row">
        <label class="filter-block">
          <span class="filter-label">文件类型</span>
          <select class="filter-control" data-compliance-file-type-filter="${escapeHtml(entity.id)}">
            <option value="all" ${filter.fileType === "all" ? "selected" : ""}>全部</option>
            ${fileTypes.map((x) => `<option value="${escapeHtml(x)}" ${filter.fileType === x ? "selected" : ""}>${escapeHtml(x)}</option>`).join("")}
          </select>
        </label>
        <label class="filter-block">
          <span class="filter-label">状态</span>
          <select class="filter-control" data-compliance-file-status-filter="${escapeHtml(entity.id)}">
            ${["all", "有效", "即将到期", "已过期", "待审核", "已拒绝"]
              .map(
                (x) =>
                  `<option value="${x}" ${filter.status === x ? "selected" : ""}>${x === "all" ? "全部" : x}</option>`
              )
              .join("")}
          </select>
        </label>
      </div>

      <div class="materials-group">
        <h6>专属文件</h6>
        <div class="compliance-file-table">
          <div class="compliance-file-row compliance-file-head">
            <span>文件类型</span><span>文件名</span><span>有效期</span><span>状态</span><span>操作</span>
          </div>
          ${filteredExclusive
            .map((file) => {
              const state = resolveComplianceFileState(file.status, file.expiryDate);
              const pendingLong = state === "待审核" && isPendingForLong(file);
              const actionLabel = state === "待审核" ? "审核" : "查看";
              return `
                <div class="compliance-file-row">
                  <span>${escapeHtml(file.fileType)} ${pendingLong ? `<span class="mini-tag wait">等待较久</span>` : ""}</span>
                  <button class="link-btn" data-compliance-open-file="${escapeHtml(file.id)}" data-compliance-source="${escapeHtml(
                    entity.id
                  )}">${escapeHtml(file.fileName)}</button>
                  <span>${formatExpiryLabel(file.expiryDate)}</span>
                  <span>${renderComplianceStatusPill(state)}</span>
                  <div class="section-actions">
                    <button class="link-btn" data-compliance-open-file="${escapeHtml(file.id)}" data-compliance-source="${escapeHtml(
                      entity.id
                    )}">${actionLabel}</button>
                    <button class="link-btn" data-compliance-replace-file="${escapeHtml(file.id)}" data-compliance-source="${escapeHtml(
                      entity.id
                    )}">替换</button>
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>
        <button class="tab-btn" data-compliance-upload-exclusive="${escapeHtml(entity.id)}">＋ 上传专属文件</button>
      </div>

      <div class="materials-group">
        <h6>共享文件（只读引用，管理请前往共享文件库）</h6>
        <div class="compliance-file-table">
          <div class="compliance-file-row compliance-file-head">
            <span>文件类型</span><span>文件名</span><span>有效期</span><span>状态</span><span>操作</span>
          </div>
          ${merchant.sharedComplianceFiles
            .slice(0, complianceSharedShowAll ? merchant.sharedComplianceFiles.length : 4)
            .map((file) => {
              const state = resolveComplianceFileState(file.status, file.expiryDate);
              return `
                <div class="compliance-file-row">
                  <span>${escapeHtml(file.fileType)}</span>
                  <button class="link-btn" data-compliance-open-file="${escapeHtml(file.id)}" data-compliance-source="shared">${escapeHtml(
                    file.fileName
                  )}</button>
                  <span>${formatExpiryLabel(file.expiryDate)}</span>
                  <span>${renderComplianceStatusPill(state)}</span>
                  <span></span>
                </div>
              `;
            })
            .join("")}
        </div>
        <button class="link-btn" data-compliance-jump-shared>查看全部 →</button>
      </div>
    </section>
  `;
}

function renderComplianceReviewsSubTab(entity) {
  const rows = [...entity.complianceReviewHistory].sort((a, b) => new Date(b.at) - new Date(a.at));
  return `
    <section class="history-timeline">
      ${rows
        .map(
          (row) => `
        <article class="timeline-item">
          <p>${formatDate(row.at)} · ${escapeHtml(row.triggerType)} · 结论：${escapeHtml(row.conclusion)}</p>
          <div class="decision-grid">
            <p>触发类型：${escapeHtml(row.triggerType)}</p>
            <p>审核人：${escapeHtml(row.reviewer)}</p>
            <p>结论：${escapeHtml(row.conclusion)}</p>
            <p>关键发现：${escapeHtml(row.finding || "—")}</p>
            <p>处置措施：${escapeHtml(row.actionTaken || "—")}</p>
            <p>完成时间：${formatExactTime(row.completionAt)}</p>
          </div>
        </article>
      `
        )
        .join("")}
    </section>
  `;
}

function renderComplianceVersionHistory(file) {
  const versions = Array.isArray(file.versions) ? file.versions : [];
  if (!versions.length) {
    return `<div class="compliance-version-row"><p>暂无历史版本</p></div>`;
  }
  return `
    <div class="compliance-version-row">
      ${versions
        .map(
          (version) => `
        <p>${formatExactTime(version.at)} · ${escapeHtml(version.fileName)} · ${escapeHtml(version.status)}</p>
      `
        )
        .join("")}
    </div>
  `;
}

function getSharedComplianceStats(files) {
  return files.reduce(
    (acc, file) => {
      const state = resolveComplianceFileState(file.status, file.expiryDate);
      if (state === "即将到期") acc.expiringSoon += 1;
      if (state === "已过期") acc.expired += 1;
      return acc;
    },
    { expiringSoon: 0, expired: 0 }
  );
}

function getComplianceReviewFile(merchant) {
  if (!complianceReviewFileId) return null;
  if (complianceReviewEntityId === "shared") {
    return merchant.sharedComplianceFiles.find((file) => file.id === complianceReviewFileId) || null;
  }
  const entity = merchant.legalEntities.find((item) => item.id === complianceReviewEntityId);
  if (!entity) return null;
  return entity.complianceFiles.find((file) => file.id === complianceReviewFileId) || null;
}

function renderComplianceStatusPill(state) {
  const map = {
    有效: "success",
    即将到期: "warning",
    已过期: "danger",
    待审核: "pending",
    已拒绝: "muted",
  };
  const cls = map[state] || "muted";
  return `<span class="tag ${cls}">${escapeHtml(state)}</span>`;
}

function renderComplianceStatusDot(status) {
  if (status.includes("受限")) return `<span class="status-dot orange">受限</span>`;
  if (status.includes("暂停")) return `<span class="status-dot red">暂停</span>`;
  return `<span class="status-dot green">正常</span>`;
}

function renderRiskRatingTag(riskRating) {
  const value = String(riskRating || "").trim();
  if (value.includes("高")) return `<span class="tag danger">风险评级：高风险</span>`;
  if (value.includes("中")) return `<span class="tag warning">风险评级：中风险</span>`;
  return `<span class="tag success">风险评级：低风险</span>`;
}

function formatExpiryLabel(expiryDate) {
  if (!expiryDate || expiryDate === "长期") return "长期";
  return expiryDate.slice(0, 7);
}

function isPendingForLong(file) {
  if (!file.uploadedAt) return false;
  return Date.now() - new Date(file.uploadedAt).getTime() > 30 * 24 * 60 * 60 * 1000;
}

function uploadSharedComplianceFile() {
  const merchant = getSelectedMerchant();
  if (!merchant) return;
  const seq = merchant.sharedComplianceFiles.length + 1;
  const file = createComplianceFile({
    id: `SCF-${merchant.customerProfileId}-${String(seq).padStart(2, "0")}`,
    fileType: "补充文件",
    fileName: `shared_upload_${seq}.pdf`,
    expiryDate: "长期",
    status: "待审核",
    source: "共享",
    uploadedAt: new Date().toISOString(),
    uploadedBy: currentOps,
    attachmentPath: "./assets/attachments/sample-document.pdf",
  });
  merchant.sharedComplianceFiles.unshift(file);
  complianceReviewEntityId = "shared";
  complianceReviewFileId = file.id;
  complianceSharedFocus = true;
  pageFlashMessage = "共享文件已上传，状态为待审核。";
  renderApp();
}

function uploadExclusiveComplianceFile(entityId) {
  const entity = getEntityById(entityId);
  if (!entity) return;
  const seq = entity.complianceFiles.length + 1;
  const file = createComplianceFile({
    id: `ECF-${entity.id}-${String(seq).padStart(2, "0")}`,
    fileType: "专属补充材料",
    fileName: `exclusive_upload_${seq}.pdf`,
    expiryDate: "长期",
    status: "待审核",
    source: "专属",
    uploadedAt: new Date().toISOString(),
    uploadedBy: currentOps,
    attachmentPath: "./assets/attachments/sample-document.pdf",
  });
  entity.complianceFiles.unshift(file);
  complianceExpandedEntityIds.add(entity.id);
  complianceSubTabByEntity[entity.id] = "files";
  complianceReviewEntityId = entity.id;
  complianceReviewFileId = file.id;
  pageFlashMessage = "专属文件已上传，进入待审核队列。";
  renderApp();
}

function replaceComplianceFile(source, fileId) {
  const merchant = getSelectedMerchant();
  if (!merchant || !fileId) return;
  const sourceFiles =
    source === "shared"
      ? merchant.sharedComplianceFiles
      : (merchant.legalEntities.find((item) => item.id === source) || { complianceFiles: [] }).complianceFiles;
  const file = sourceFiles.find((item) => item.id === fileId);
  if (!file) return;

  file.versions = Array.isArray(file.versions) ? file.versions : [];
  file.versions.unshift({
    at: new Date().toISOString(),
    fileName: file.fileName,
    status: "已归档",
    expiryDate: file.expiryDate,
  });

  const nextName = file.fileName.replace(/(\.\w+)$/, `_v${file.versions.length + 1}$1`);
  file.fileName = nextName;
  file.status = "待审核";
  file.uploadedAt = new Date().toISOString();
  file.uploadedBy = currentOps;
  file.isExpired = false;

  complianceReviewEntityId = source;
  complianceReviewFileId = file.id;
  complianceReviewComment = "";
  pageFlashMessage = "已上传新版本文件，旧版本已归档。";
  renderApp();
}

function reviewComplianceFile(entityId, action) {
  const entity = getEntityById(entityId);
  if (!entity) return;
  const file = entity.complianceFiles.find((item) => item.id === complianceReviewFileId);
  if (!file) return;

  const beforeState = resolveComplianceFileState(file.status, file.expiryDate);
  if (action === "通过") {
    file.status = "已验证";
    const nextState = resolveComplianceFileState(file.status, file.expiryDate);
    file.isExpired = nextState === "已过期";
    entity.complianceReviewHistory.unshift({
      id: `RV-${entity.id}-${Date.now()}`,
      at: new Date().toISOString(),
      triggerType: "事件驱动",
      reviewer: currentOps,
      conclusion: "通过",
      finding: complianceReviewComment.trim() || `${file.fileType} 已审核通过`,
      actionTaken: "更新文件状态并发布 DOC_UPDATED 事件",
      completionAt: new Date().toISOString(),
    });
    entity.history.unshift(
      createEntityHistoryRecord({
        actor: currentOps,
        action: `合规文件审核通过（${file.fileType}）`,
        detail: complianceReviewComment.trim() || "DOC_UPDATED",
        context: { workflow: "合规档案", fileId: file.id, event: "DOC_UPDATED" },
        changes: [
          { field: "文件状态", before: beforeState, after: nextState },
          { field: "is_expired", before: String(false), after: String(file.isExpired) },
        ],
      })
    );
    pageFlashMessage = "文件审核已通过，已发布 DOC_UPDATED 事件。";
  } else {
    file.status = "已拒绝";
    entity.complianceReviewHistory.unshift({
      id: `RV-${entity.id}-${Date.now()}`,
      at: new Date().toISOString(),
      triggerType: "事件驱动",
      reviewer: currentOps,
      conclusion: "拒绝",
      finding: complianceReviewComment.trim() || `${file.fileType} 需重新上传`,
      actionTaken: "通知商户重新上传",
      completionAt: new Date().toISOString(),
    });
    entity.history.unshift(
      createEntityHistoryRecord({
        actor: currentOps,
        action: `合规文件审核拒绝（${file.fileType}）`,
        detail: complianceReviewComment.trim() || "通知商户重新上传",
        context: { workflow: "合规档案", fileId: file.id },
        changes: [{ field: "文件状态", before: beforeState, after: "已拒绝" }],
      })
    );
    pageFlashMessage = "文件已拒绝，已通知商户重新上传。";
  }
  complianceReviewComment = "";
  renderApp();
}

function ensureContractsExpansionState(merchant) {
  if (contractsExpandedForMerchantId !== merchant.id) {
    contractsExpandedEntityIds.clear();
    merchant.legalEntities.forEach((entity) => {
      const signed = entity.contractData?.current?.status === "生效中";
      const liveProducts = entity.contractProducts.filter((p) => p.status === "生效").length;
      if (signed && liveProducts === 0) {
        contractsExpandedEntityIds.add(entity.id);
      }
      if (!contractsSubTabByEntity[entity.id]) contractsSubTabByEntity[entity.id] = "contract";
    });
    contractsExpandedForMerchantId = merchant.id;
    contractsEditEntityId = "";
    contractsChangeDrawerEntityId = "";
    contractsProductDrawerEntityId = "";
    contractsProductManageEntityId = "";
    contractsProductManageCode = "";
    contractsFeePlanChangeDrawerEntityId = "";
    contractsFeePlanChangeProductCode = "";
  }
}

function renderMerchantContractsTab(merchant) {
  ensureContractsExpansionState(merchant);
  const previewFile =
    contractsPreviewAttachmentPath && contractsPreviewFileName
      ? createComplianceFile({
          fileType: "合约原件",
          fileName: contractsPreviewFileName,
          status: "已验证",
          expiryDate: "长期",
          attachmentPath: contractsPreviewAttachmentPath,
          source: "专属",
        })
      : null;
  return `
    <section class="merchant-tab-grid">
      <section class="kyb-license-blocks">
        ${merchant.legalEntities
          .map((entity) => {
            const expanded = contractsExpandedEntityIds.has(entity.id);
            const activeSubTab = contractsSubTabByEntity[entity.id] || "contract";
            const signed = entity.contractData.current.status === "生效中";
            const liveProducts = entity.contractProducts.filter((p) => p.status === "生效").length;
            return `
              <article class="card kyb-license-block">
                <div class="kyb-license-head">
                  <div>
                    <h5>${escapeHtml(entity.licenseName)} · ${renderContractStateDot(entity.contractData.current.status)}</h5>
                    ${
                      signed && liveProducts === 0
                        ? `<p class="drawer-error" style="margin:6px 0 0;">合约已生效，尚未开通任何产品</p>`
                        : `<p>合约状态：${escapeHtml(entity.contractData.current.status)} · 已开通产品：${liveProducts}</p>`
                    }
                  </div>
                  <button class="tab-btn" data-contracts-entity-toggle="${escapeHtml(entity.id)}">${expanded ? "折叠" : "展开"}</button>
                </div>
                ${
                  expanded
                    ? `
                  <div class="tabs tabs-strong">
                    ${[
                      ["contract", "合约管理"],
                      ["products", "产品与费率"],
                    ]
                      .map(
                        ([tabId, label]) =>
                          `<button class="tab-btn ${activeSubTab === tabId ? "active" : ""}" data-contracts-subtab="${tabId}" data-entity-id="${escapeHtml(
                            entity.id
                          )}">${label}</button>`
                      )
                      .join("")}
                  </div>
                  <div class="kyb-subtab-content">
                    ${
                      activeSubTab === "contract"
                        ? renderContractsContractSubTab(entity)
                        : renderContractsProductsSubTab(entity)
                    }
                    ${renderContractsChangeLog(entity)}
                  </div>
                `
                    : ""
                }
              </article>
            `;
          })
          .join("")}
      </section>
      ${
        previewFile
          ? `
        <aside class="material-review-panel">
          <div class="section-head">
            <h5>合约原件预览</h5>
            <button class="tab-btn" data-contract-preview-close>关闭</button>
          </div>
          ${renderMaterialPreview(previewFile)}
        </aside>
      `
          : ""
      }
    </section>
  `;
}

function renderContractsContractSubTab(entity) {
  const current = entity.contractData.current;
  return `
    <section class="decision-panel">
      <h6>当前合约</h6>
      <div class="decision-grid">
        <p>合约编号：${escapeHtml(current.contractId)}</p>
        <p>合约版本：${escapeHtml(current.version)}</p>
        <p>合约类型：${escapeHtml(current.contractType)}</p>
        <p>签署方：${escapeHtml(current.signer)}</p>
        <p>签署时间：${formatExactTime(current.signedAt)}</p>
        <p>签署方式：${escapeHtml(current.signMethod)}</p>
        <p>生效日期：${escapeHtml(current.effectiveDate)}</p>
        <p>到期日期：${escapeHtml(current.expiryDate)}</p>
        <p>自动续签：${escapeHtml(current.autoRenew)}</p>
        <p>合约状态：${renderContractStateDot(current.status)}</p>
      </div>
      <div class="section-actions">
        <button class="link-btn" data-contract-view-file="${escapeHtml(entity.id)}">查看合约原件 →</button>
        <button class="tab-btn" data-contract-change-open="${escapeHtml(entity.id)}">发起合约变更</button>
      </div>
      <div class="materials-group">
        <h6>历史合约</h6>
        <div class="compliance-file-table">
          <div class="compliance-file-row compliance-file-head"><span>合约编号</span><span>版本</span><span>状态</span><span>生效期</span><span>操作</span></div>
          ${entity.contractData.history
            .map(
              (item) => `
            <div class="compliance-file-row">
              <span>${escapeHtml(item.contractId)}</span>
              <span>${escapeHtml(item.version)}</span>
              <span>${renderContractStateDot(item.status)}</span>
              <span>${escapeHtml(item.period)}</span>
              <button class="link-btn" data-contract-view-history-file="${escapeHtml(entity.id)}">查看</button>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
      ${
        contractsChangeDrawerEntityId === entity.id
          ? renderContractChangeDrawer(entity)
          : ""
      }
    </section>
  `;
}

function renderContractsProductsSubTab(entity) {
  const contractActive = entity.contractData.current.status === "生效中";
  const availableCatalog = contractProductCatalog;
  const byCode = new Map(entity.contractProducts.map((p) => [p.code, p]));
  return `
    <section class="decision-panel ${contractActive ? "" : "contracts-disabled"}">
      ${
        contractActive
          ? `<div class="section-actions" style="justify-content:flex-end;"><button class="tab-btn active" data-product-open-drawer="${escapeHtml(
              entity.id
            )}">＋ 开通新产品</button></div>`
          : `<p class="drawer-error">请等待合约签署完成后配置产品</p>`
      }
      <div class="materials-group">
        <div class="compliance-file-table">
          <div class="compliance-file-row compliance-file-head"><span>产品名称</span><span>支持币种</span><span>Fee Plan</span><span>状态</span><span>操作</span></div>
          ${availableCatalog
            .map((catalog) => {
              const item = byCode.get(catalog.code);
              const activeItem = item && item.status !== "已终止";
              const status = item ? item.status : "未开通";
              const action = activeItem ? "管理" : "开通";
              return `
                <div class="compliance-file-row">
                  <span>${escapeHtml(catalog.name)}</span>
                  <span>${item && item.currencies.length ? escapeHtml(item.currencies.join(" · ")) : "—"}</span>
                  <span>${item && item.feePlanName ? escapeHtml(item.feePlanName) : "—"}</span>
                  <span>${renderProductStatusPill(status)}</span>
                  <button class="tab-btn ${activeItem ? "" : "active"}" data-product-action="${action}" data-product-entity-id="${escapeHtml(
                    entity.id
                  )}" data-product-code="${escapeHtml(catalog.code)}">${action}</button>
                </div>
              `;
            })
            .join("")}
        </div>
      </div>
      ${
        contractsProductDrawerEntityId === entity.id
          ? renderProductEnableDrawer(entity)
          : ""
      }
      ${
        contractsProductManageEntityId === entity.id && contractsProductManageCode
          ? renderProductManagePanel(entity, contractsProductManageCode)
          : ""
      }
      ${
        contractsFeePlanChangeDrawerEntityId === entity.id && contractsFeePlanChangeProductCode
          ? renderFeePlanChangePanel(entity, contractsFeePlanChangeProductCode)
          : ""
      }
    </section>
  `;
}

function renderContractChangeDrawer(entity) {
  const options = [
    ["scope", "产品范围调整（不需要重新签署）"],
    ["terms", "条款变更（需要商户重新签署）"],
    ["terminate", "合约终止"],
  ];
  return `
    <div class="inline-drawer">
      <h5>发起合约变更</h5>
      <label>
        <span>变更类型</span>
        <select class="filter-control" data-contract-change-type>
          ${options
            .map(
              ([value, label]) =>
                `<option value="${value}" ${contractsChangeType === value ? "selected" : ""}>${label}</option>`
            )
            .join("")}
        </select>
      </label>
      <label>
        <span>变更说明</span>
        <textarea class="filter-control" rows="3" data-contract-change-reason>${escapeHtml(contractsChangeReason)}</textarea>
      </label>
      <div class="section-actions">
        <button class="tab-btn" data-contract-change-cancel>取消</button>
        <button class="tab-btn active" data-contract-change-submit data-entity-id="${escapeHtml(entity.id)}">提交</button>
      </div>
    </div>
  `;
}

function renderProductEnableDrawer(entity) {
  const product = getProductByCode(contractsSelectedProductCode);
  const available = getAvailableProductsForEntity(entity);
  const inScope = product ? isProductInContractScope(entity, product.name) : true;
  const noFeePlans = billingFeePlans.length === 0;
  return `
    <div class="inline-drawer">
      <h5>开通新产品 · Step ${contractsProductDrawerStep} / 4</h5>
      ${
        contractsProductDrawerStep === 1
          ? `
        <label>
          <span>选择产品</span>
          <select class="filter-control" data-product-drawer-product>
            <option value="">请选择</option>
            ${available.map((item) => `<option value="${escapeHtml(item.code)}" ${contractsSelectedProductCode === item.code ? "selected" : ""}>${escapeHtml(item.name)}</option>`).join("")}
          </select>
        </label>
        ${
          product && !inScope
            ? `<p class="drawer-error">需先发起合约变更</p>`
            : ""
        }
      `
          : contractsProductDrawerStep === 2
            ? `
        <label>
          <span>支持币种（多选）</span>
          <div class="checkbox-list">
            ${["USDT", "USDC", "PYUSD"]
              .map(
                (ccy) =>
                  `<label><input type="checkbox" data-product-drawer-currency="${ccy}" ${
                    contractsSelectedCurrencies.has(ccy) ? "checked" : ""
                  } /> ${ccy}</label>`
              )
              .join("")}
          </div>
        </label>
        <label>
          <span>地区限制（选填）</span>
          <input class="filter-control" data-product-drawer-regions value="${escapeHtml(contractsSelectedRegions)}" placeholder="如：SG, HK" />
        </label>
      `
            : contractsProductDrawerStep === 3
              ? `
        ${
          noFeePlans
            ? `<p class="drawer-error">暂无已审批的 Fee Plan，请联系计收费团队配置</p>`
            : ""
        }
        <label>
          <span>绑定 Fee Plan</span>
          <select class="filter-control" data-product-drawer-fee-plan ${noFeePlans ? "disabled" : ""}>
            <option value="">请选择</option>
            ${billingFeePlans
              .map(
                (plan) =>
                  `<option value="${plan.id}" ${contractsSelectedFeePlanId === plan.id ? "selected" : ""}>${escapeHtml(
                    `${plan.name} · ${plan.version} · ${plan.desc}`
                  )}</option>`
              )
              .join("")}
          </select>
        </label>
      `
              : `
        <div class="decision-grid">
          <p>产品：${escapeHtml(product?.name || "-")}</p>
          <p>支持币种：${contractsSelectedCurrencies.size ? escapeHtml([...contractsSelectedCurrencies].join(" · ")) : "—"}</p>
          <p>地区限制：${escapeHtml(contractsSelectedRegions || "无限制")}</p>
          <p>Fee Plan：${escapeHtml(getFeePlanById(contractsSelectedFeePlanId)?.name || "—")}</p>
        </div>
      `
      }
      <div class="section-actions">
        <button class="tab-btn" data-product-drawer-cancel>取消</button>
        ${
          contractsProductDrawerStep > 1
            ? `<button class="tab-btn" data-product-drawer-prev>上一步</button>`
            : ""
        }
        ${
          contractsProductDrawerStep < 4
            ? `<button class="tab-btn active" data-product-drawer-next data-entity-id="${escapeHtml(entity.id)}">下一步</button>`
            : `<button class="tab-btn active" data-product-drawer-confirm data-entity-id="${escapeHtml(entity.id)}">确认开通</button>`
        }
      </div>
    </div>
  `;
}

function renderProductManagePanel(entity, productCode) {
  const item = entity.contractProducts.find((p) => p.code === productCode);
  if (!item) return "";
  return `
    <div class="inline-drawer">
      <h5>${escapeHtml(item.name)} · 管理</h5>
      <div class="decision-grid">
        <p>支持币种：${item.currencies.length ? escapeHtml(item.currencies.join(" · ")) : "—"}</p>
        <p>地区限制：${item.regions.length ? escapeHtml(item.regions.join(" · ")) : "无限制"}</p>
        <p>Fee Plan：${escapeHtml(item.feePlanName || "—")}</p>
        <p>生效时间：${formatDate(item.activatedAt)}</p>
      </div>
      <div class="section-actions">
        <button class="tab-btn" data-product-manage-fee-plan data-entity-id="${escapeHtml(entity.id)}" data-product-code="${escapeHtml(
          productCode
        )}">变更 Fee Plan</button>
        <button class="tab-btn" data-product-manage-currencies data-entity-id="${escapeHtml(entity.id)}" data-product-code="${escapeHtml(
          productCode
        )}">调整支持币种</button>
        ${
          item.status === "已暂停"
            ? `<button class="tab-btn" data-product-manage-resume data-entity-id="${escapeHtml(entity.id)}" data-product-code="${escapeHtml(
                productCode
              )}">恢复产品</button>`
            : `<button class="tab-btn" data-product-manage-pause data-entity-id="${escapeHtml(entity.id)}" data-product-code="${escapeHtml(
                productCode
              )}">暂停产品</button>`
        }
        <button class="tab-btn" data-product-manage-terminate data-entity-id="${escapeHtml(entity.id)}" data-product-code="${escapeHtml(
          productCode
        )}">终止产品</button>
      </div>
    </div>
  `;
}

function renderFeePlanChangePanel(entity, productCode) {
  const item = entity.contractProducts.find((p) => p.code === productCode);
  if (!item) return "";
  return `
    <div class="inline-drawer">
      <h5>变更 Fee Plan（双人审核）</h5>
      <label>
        <span>新 Fee Plan</span>
        <select class="filter-control" data-fee-plan-change-target>
          <option value="">请选择</option>
          ${billingFeePlans.map((plan) => `<option value="${plan.id}" ${contractsFeePlanTarget === plan.id ? "selected" : ""}>${escapeHtml(plan.name)}</option>`).join("")}
        </select>
      </label>
      <label>
        <span>变更原因</span>
        <textarea class="filter-control" rows="2" data-fee-plan-change-reason>${escapeHtml(contractsFeePlanChangeReason)}</textarea>
      </label>
      <label>
        <span>审批确认人</span>
        <select class="filter-control" data-fee-plan-change-approver>
          <option value="">请选择</option>
          ${opsApproverOptions.map((name) => `<option value="${escapeHtml(name)}" ${contractsFeePlanSecondApprover === name ? "selected" : ""}>${escapeHtml(name)}</option>`).join("")}
        </select>
      </label>
      <p>当前：${escapeHtml(item.feePlanName || "—")}</p>
      <div class="section-actions">
        <button class="tab-btn" data-fee-plan-change-cancel>取消</button>
        <button class="tab-btn active" data-fee-plan-change-submit data-entity-id="${escapeHtml(entity.id)}" data-product-code="${escapeHtml(
          productCode
        )}">提交审批并生效</button>
      </div>
    </div>
  `;
}

function renderContractsChangeLog(entity) {
  const rows = [...entity.contractChangeLogs].sort((a, b) => new Date(b.at) - new Date(a.at));
  const preview = contractsEditEntityId === entity.id ? rows : rows.slice(0, 3);
  return `
    <article class="card">
      <div class="section-head">
        <h4>变更日志</h4>
        <button class="link-btn" data-contract-log-toggle="${escapeHtml(entity.id)}">${contractsEditEntityId === entity.id ? "收起" : "查看全部 →"}</button>
      </div>
      <div class="history-timeline">
        ${preview
          .map(
            (log) => `
          <article class="timeline-item">
            <p>${formatExactTime(log.at)} · ${escapeHtml(log.actor)} · ${escapeHtml(log.action)}</p>
            <strong>${escapeHtml(log.detail)}</strong>
          </article>
        `
          )
          .join("")}
      </div>
    </article>
  `;
}

function getProductByCode(code) {
  return contractProductCatalog.find((item) => item.code === code) || null;
}

function getAvailableProductsForEntity(entity) {
  const opened = new Set(entity.contractProducts.filter((p) => p.status !== "已终止").map((p) => p.code));
  return contractProductCatalog.filter((item) => !opened.has(item.code));
}

function isProductInContractScope(entity, productName) {
  return (entity.contractData.current.scopeAuthorized || []).includes(productName);
}

function getFeePlanById(id) {
  return billingFeePlans.find((plan) => plan.id === id) || null;
}

function renderContractStateDot(status) {
  if (status === "生效中") return `<span class="status-dot green">生效中</span>`;
  if (status === "待签署" || status === "草稿") return `<span class="status-dot orange">${escapeHtml(status)}</span>`;
  return `<span class="status-dot red">${escapeHtml(status)}</span>`;
}

function renderProductStatusPill(status) {
  if (status === "生效") return `<span class="tag success">生效</span>`;
  if (status === "已暂停") return `<span class="tag warning">已暂停</span>`;
  if (status === "已终止") return `<span class="tag muted">已终止</span>`;
  return `<span class="tag">未开通</span>`;
}

function submitContractChange(entityId) {
  const entity = getEntityById(entityId);
  if (!entity) return;
  const reason = contractsChangeReason.trim();
  if (!reason) {
    pageFlashMessage = "请填写变更说明。";
    renderApp();
    return;
  }
  const typeLabel =
    contractsChangeType === "scope"
      ? "产品范围调整"
      : contractsChangeType === "terms"
        ? "条款变更（需重签）"
        : "合约终止";
  entity.contractChangeLogs.unshift({
    at: new Date().toISOString(),
    actor: currentOps,
    action: "发起合约变更",
    detail: `${typeLabel}：${reason}`,
  });
  if (contractsChangeType === "terminate") {
    entity.contractData.current.status = "已终止";
  } else if (contractsChangeType === "terms") {
    entity.contractData.current.status = "待签署";
  }
  pushAuditLog(
    getSelectedMerchant().profileAuditLogs,
    "合约变更",
    entity.contractData.current.contractId,
    `${entity.licenseName} · ${typeLabel}`
  );
  contractsChangeDrawerEntityId = "";
  contractsChangeReason = "";
  pageFlashMessage = contractsChangeType === "terms" ? "已提交条款变更，系统将发送签署邀请。" : "合约变更已提交并记录日志。";
  renderApp();
}

function openProductDrawer(entityId, preselectCode = "") {
  const entity = getEntityById(entityId);
  if (!entity) return;
  if (entity.contractData.current.status !== "生效中") {
    pageFlashMessage = "请等待合约签署完成后配置产品。";
    renderApp();
    return;
  }
  contractsProductDrawerEntityId = entityId;
  contractsProductDrawerStep = 1;
  contractsSelectedProductCode = preselectCode;
  contractsSelectedCurrencies = new Set();
  contractsSelectedRegions = "";
  contractsSelectedFeePlanId = "";
  contractsProductManageEntityId = "";
  contractsProductManageCode = "";
  renderApp();
}

function resetProductDrawer() {
  contractsProductDrawerEntityId = "";
  contractsProductDrawerStep = 1;
  contractsSelectedProductCode = "";
  contractsSelectedCurrencies = new Set();
  contractsSelectedRegions = "";
  contractsSelectedFeePlanId = "";
}

function moveProductDrawerNext(entityId) {
  const entity = getEntityById(entityId);
  if (!entity) return;
  if (contractsProductDrawerStep === 1) {
    const product = getProductByCode(contractsSelectedProductCode);
    if (!product) {
      pageFlashMessage = "请先选择产品。";
      renderApp();
      return;
    }
    if (!isProductInContractScope(entity, product.name)) {
      pageFlashMessage = "该产品不在合约授权范围内，需先发起合约变更。";
      renderApp();
      return;
    }
  }
  if (contractsProductDrawerStep === 3) {
    const product = getProductByCode(contractsSelectedProductCode);
    if (product?.needsFeePlan && !contractsSelectedFeePlanId) {
      pageFlashMessage = "请选择 Fee Plan。";
      renderApp();
      return;
    }
  }
  contractsProductDrawerStep = Math.min(4, contractsProductDrawerStep + 1);
  renderApp();
}

function confirmEnableProduct(entityId) {
  const entity = getEntityById(entityId);
  if (!entity) return;
  const product = getProductByCode(contractsSelectedProductCode);
  if (!product) return;
  const feePlan = getFeePlanById(contractsSelectedFeePlanId);
  entity.contractProducts.push({
    code: product.code,
    name: product.name,
    currencies: [...contractsSelectedCurrencies],
    regions: contractsSelectedRegions
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean),
    feePlanId: feePlan?.id || "",
    feePlanName: feePlan?.name || "—",
    status: "生效",
    activatedAt: new Date().toISOString(),
  });
  entity.contractChangeLogs.unshift({
    at: new Date().toISOString(),
    actor: currentOps,
    action: "开通产品",
    detail: `${product.name} · ${feePlan?.name || "无费率"}`,
  });
  pushAuditLog(getSelectedMerchant().profileAuditLogs, "开通产品", "-", `${entity.licenseName} · ${product.name}`);
  resetProductDrawer();
  pageFlashMessage = "产品已开通，权限快照已更新并通知商户。";
  renderApp();
}

function adjustProductCurrencies(entityId, productCode) {
  const entity = getEntityById(entityId);
  if (!entity) return;
  const product = entity.contractProducts.find((p) => p.code === productCode);
  if (!product) return;
  const next = product.currencies.includes("PYUSD")
    ? product.currencies.filter((c) => c !== "PYUSD")
    : [...product.currencies, "PYUSD"];
  const before = product.currencies.join(" · ") || "—";
  product.currencies = next;
  entity.contractChangeLogs.unshift({
    at: new Date().toISOString(),
    actor: currentOps,
    action: "调整支持币种",
    detail: `${product.name}：${before} → ${next.join(" · ") || "—"}`,
  });
  pageFlashMessage = "支持币种已更新。";
  renderApp();
}

function changeProductStatus(entityId, productCode, status) {
  const entity = getEntityById(entityId);
  if (!entity) return;
  const product = entity.contractProducts.find((p) => p.code === productCode);
  if (!product) return;
  const promptText =
    status === "已暂停" ? "请输入暂停原因" : status === "生效" ? "请输入恢复原因" : "请输入终止原因";
  const reason = window.prompt(promptText);
  if (!reason) return;
  if (status === "已终止" && !window.confirm("该操作不可恢复，确认终止产品？")) return;
  const before = product.status;
  product.status = status;
  entity.contractChangeLogs.unshift({
    at: new Date().toISOString(),
    actor: currentOps,
    action: status === "已暂停" ? "暂停产品" : status === "生效" ? "恢复产品" : "终止产品",
    detail: `${product.name}：${before} → ${status}；原因：${reason}`,
  });
  pushAuditLog(getSelectedMerchant().profileAuditLogs, "产品状态变更", `${product.name}:${before}`, `${product.name}:${status}`);
  pageFlashMessage =
    status === "已暂停"
      ? "产品已暂停，可随时恢复。"
      : status === "生效"
        ? "产品已恢复生效。"
        : "产品已终止，需重新走开通流程。";
  renderApp();
}

function submitFeePlanChange(entityId, productCode) {
  const entity = getEntityById(entityId);
  if (!entity) return;
  const product = entity.contractProducts.find((p) => p.code === productCode);
  if (!product) return;
  if (!contractsFeePlanTarget) {
    pageFlashMessage = "请选择新 Fee Plan。";
    renderApp();
    return;
  }
  if (!contractsFeePlanChangeReason.trim()) {
    pageFlashMessage = "请填写变更原因。";
    renderApp();
    return;
  }
  if (!contractsFeePlanSecondApprover) {
    pageFlashMessage = "请选择审批确认人。";
    renderApp();
    return;
  }
  const target = getFeePlanById(contractsFeePlanTarget);
  const before = product.feePlanName || "—";
  product.feePlanId = target?.id || "";
  product.feePlanName = target?.name || product.feePlanName;
  entity.contractChangeLogs.unshift({
    at: new Date().toISOString(),
    actor: currentOps,
    action: "变更 Fee Plan",
    detail: `${product.name}：${before} → ${product.feePlanName}（二审：${contractsFeePlanSecondApprover}）`,
  });
  pushAuditLog(getSelectedMerchant().profileAuditLogs, "Fee Plan变更", before, product.feePlanName);
  contractsFeePlanChangeDrawerEntityId = "";
  contractsFeePlanChangeProductCode = "";
  contractsFeePlanTarget = "";
  contractsFeePlanChangeReason = "";
  contractsFeePlanSecondApprover = "";
  pageFlashMessage = "Fee Plan 变更审批通过并已生效，权限快照已更新。";
  renderApp();
}

function ensureAccountsExpansionState(merchant) {
  if (accountsExpandedForMerchantId !== merchant.id) {
    accountsExpandedEntityIds.clear();
    merchant.legalEntities.forEach((entity) => {
      const pendingLink = entity.accountStructure.bankAccounts.some((x) => x.status === "待关联");
      const pendingWhitelist = entity.accountStructure.whitelistEntries.some((x) => x.status === "待审核");
      if (pendingLink || pendingWhitelist) accountsExpandedEntityIds.add(entity.id);
      if (!accountsSubTabByEntity[entity.id]) accountsSubTabByEntity[entity.id] = "assets";
      if (!accountsWhitelistFilterByEntity[entity.id]) accountsWhitelistFilterByEntity[entity.id] = { type: "all", status: "all" };
    });
    accountsExpandedForMerchantId = merchant.id;
    clearAccountsDrawerState();
  }
}

function renderMerchantAccountsTab(merchant) {
  ensureAccountsExpansionState(merchant);
  return `
    <section class="merchant-tab-grid">
      <section class="kyb-license-blocks">
        ${merchant.legalEntities
          .map((entity) => {
            const expanded = accountsExpandedEntityIds.has(entity.id);
            const subTab = accountsSubTabByEntity[entity.id] || "assets";
            const ua = entity.accountStructure.unifiedAccount;
            return `
              <article class="card kyb-license-block ${ua.status === "已暂停" ? "compliance-abnormal" : ""}">
                <div class="kyb-license-head">
                  <div>
                    <h5>${escapeHtml(entity.licenseName)} · ${escapeHtml(ua.id)} · ${renderProductStatusPill(
                      ua.status === "正常" ? "生效" : "已暂停"
                    )}</h5>
                    <p>统一账户 · 开户于 ${escapeHtml(ua.openedAt)}</p>
                  </div>
                  <button class="tab-btn" data-accounts-entity-toggle="${escapeHtml(entity.id)}">${expanded ? "折叠" : "展开"}</button>
                </div>
                ${
                  expanded
                    ? `
                  <div class="tabs tabs-strong">
                    ${[
                      ["assets", "资产账户"],
                      ["banks", "银行账户"],
                      ["whitelist", "出金白名单"],
                    ]
                      .map(
                        ([tabId, label]) =>
                          `<button class="tab-btn ${subTab === tabId ? "active" : ""}" data-accounts-subtab="${tabId}" data-entity-id="${escapeHtml(
                            entity.id
                          )}">${label}</button>`
                      )
                      .join("")}
                  </div>
                  <div class="kyb-subtab-content">
                    ${
                      subTab === "assets"
                        ? renderAccountsAssetsSubTab(entity)
                        : subTab === "banks"
                          ? renderAccountsBanksSubTab(entity)
                          : renderAccountsWhitelistSubTab(entity)
                    }
                  </div>
                `
                    : ""
                }
              </article>
            `;
          })
          .join("")}
      </section>
      ${renderAccountsRightDrawer(merchant)}
    </section>
  `;
}

function renderAccountsAssetsSubTab(entity) {
  const structure = entity.accountStructure;
  const ua = structure.unifiedAccount;
  const paused = ua.status === "已暂停";
  return `
    <section class="decision-panel">
      <section class="account-hierarchy">
        <article class="hier-node hier-l1 ${paused ? "accounts-disabled-row" : ""}">
          <div class="hier-head">
            <div>
              <p class="hier-level">L1 · UnifiedAccount</p>
              <p class="hier-title">${escapeHtml(ua.id)} ${renderProductStatusPill(paused ? "已暂停" : "生效")}</p>
              <p class="hier-meta">开户时间：${escapeHtml(ua.openedAt)} · 主币种：${escapeHtml(ua.baseCurrency)}</p>
            </div>
            <div class="section-actions">
              <button class="tab-btn" data-accounts-pause-all-open data-entity-id="${escapeHtml(entity.id)}">${
                paused ? "恢复全部账户" : "暂停全部账户"
              }</button>
            </div>
          </div>
        </article>

        <article class="hier-node hier-l2 ${paused ? "accounts-disabled-row" : ""}">
          <div class="hier-head">
            <div>
              <p class="hier-level">L2 · AssetAccount</p>
              <p class="hier-title">${escapeHtml(structure.assetAccount.id)} ${renderProductStatusPill(paused ? "已暂停" : "生效")}</p>
              <p class="hier-meta">资产类账户容器（法币/稳定币）</p>
            </div>
          </div>
        </article>

        <article class="hier-node hier-l3 ${paused ? "accounts-disabled-row" : ""}">
          <div class="materials-group">
            <h6>L3 · 法币账户</h6>
            <div class="compliance-file-table">
              <div class="compliance-file-row compliance-file-head"><span>币种</span><span>虚拟账户号 / 地址</span><span>充值/提现</span><span>状态</span><span>操作</span></div>
              ${structure.fiatAccounts
                .map(
                  (acc) => `
              <div class="compliance-file-row">
                <span>${escapeHtml(acc.currency)}</span>
                <span>${escapeHtml(acc.virtualAccountNo)}</span>
                <span>${acc.canDeposit ? "✓" : "✗"} / ${acc.canWithdraw ? "✓" : "✗"}</span>
                <span>${renderProductStatusPill(acc.status === "正常" ? "生效" : "已暂停")}</span>
                <button class="tab-btn" ${paused ? "disabled" : ""} data-accounts-manage-account data-entity-id="${escapeHtml(entity.id)}" data-account-id="${escapeHtml(
                  acc.id
                )}" data-account-type="fiat">${paused ? "查看" : "管理"}</button>
              </div>
            `
                )
                .join("")}
            </div>
            <div class="section-actions">
              <button class="tab-btn" ${paused ? "disabled" : ""} data-accounts-open-add-fiat data-entity-id="${escapeHtml(entity.id)}">＋ 新增法币账户</button>
            </div>
          </div>
        </article>

        <article class="hier-node hier-l3 ${paused ? "accounts-disabled-row" : ""}">
          <div class="materials-group">
            <h6>L3 · 稳定币账户</h6>
            <div class="compliance-file-table">
              <div class="compliance-file-row compliance-file-head"><span>Token</span><span>收款地址（脱敏）</span><span>充值/提现</span><span>状态</span><span>操作</span></div>
              ${structure.stableAccounts
                .map(
                  (acc) => `
              <div class="compliance-file-row">
                <span>${escapeHtml(acc.token)}</span>
                <span>${escapeHtml(maskAddress(acc.address))}</span>
                <span>${acc.canDeposit ? "✓" : "✗"} / ${acc.canWithdraw ? "✓" : "✗"}</span>
                <span>${renderProductStatusPill(acc.status === "正常" ? "生效" : "已暂停")}</span>
                <button class="tab-btn" ${paused ? "disabled" : ""} data-accounts-manage-account data-entity-id="${escapeHtml(entity.id)}" data-account-id="${escapeHtml(
                  acc.id
                )}" data-account-type="stable">${paused ? "查看" : "管理"}</button>
              </div>
            `
                )
                .join("")}
            </div>
          </div>
        </article>
      </section>
    </section>
  `;
}

function renderFiatAccountManagePanel(entity, account, unifiedPaused) {
  return `
    <div class="inline-drawer">
      <h5>${escapeHtml(account.currency)} 账户 · 管理</h5>
      <div class="decision-grid">
        <p>账户 ID：${escapeHtml(account.id)}</p>
        <p>币种：${escapeHtml(account.currency)}</p>
        <p>虚拟账户号：${escapeHtml(account.virtualAccountNo)}</p>
        <p>虚拟账户服务商：${escapeHtml(account.provider)}</p>
        <p>开立时间：${escapeHtml(account.openedAt)}</p>
      </div>
      <div class="section-actions">
        <button class="tab-btn" ${unifiedPaused ? "disabled" : ""} data-accounts-toggle-deposit data-entity-id="${escapeHtml(
          entity.id
        )}" data-account-id="${escapeHtml(account.id)}">${account.canDeposit ? "暂停充值" : "恢复充值"}</button>
        <button class="tab-btn" ${unifiedPaused ? "disabled" : ""} data-accounts-toggle-withdraw data-entity-id="${escapeHtml(
          entity.id
        )}" data-account-id="${escapeHtml(account.id)}">${account.canWithdraw ? "暂停提现" : "恢复提现"}</button>
        <button class="tab-btn" ${unifiedPaused ? "disabled" : ""} data-accounts-toggle-account-status data-entity-id="${escapeHtml(
          entity.id
        )}" data-account-id="${escapeHtml(account.id)}" data-account-type="fiat">${
    account.status === "正常" ? "暂停账户" : "恢复账户"
  }</button>
        <button class="link-btn" data-accounts-view-ledger>查看账务记录</button>
      </div>
    </div>
  `;
}

function renderStableAccountManagePanel(entity, account, unifiedPaused) {
  return `
    <div class="inline-drawer">
      <h5>${escapeHtml(account.token)} 账户 · 管理</h5>
      <div class="decision-grid">
        <p>账户 ID：${escapeHtml(account.id)}</p>
        <p>Token：${escapeHtml(account.token)}</p>
        <p>收款地址：${escapeHtml(account.address)} <button class="link-btn" data-accounts-copy-address="${escapeHtml(account.address)}">复制</button></p>
        <p>收款 Memo：${escapeHtml(account.memo)}</p>
        <p>最小充值金额：${escapeHtml(account.minDeposit)}</p>
        <p>开立时间：${escapeHtml(account.openedAt)}</p>
      </div>
      <div class="section-actions">
        <button class="tab-btn" ${unifiedPaused ? "disabled" : ""} data-accounts-toggle-deposit data-entity-id="${escapeHtml(
          entity.id
        )}" data-account-id="${escapeHtml(account.id)}">${account.canDeposit ? "暂停充值" : "恢复充值"}</button>
        <button class="tab-btn" ${unifiedPaused ? "disabled" : ""} data-accounts-toggle-withdraw data-entity-id="${escapeHtml(
          entity.id
        )}" data-account-id="${escapeHtml(account.id)}">${account.canWithdraw ? "暂停提现" : "恢复提现"}</button>
        <button class="tab-btn" ${unifiedPaused ? "disabled" : ""} data-accounts-toggle-account-status data-entity-id="${escapeHtml(
          entity.id
        )}" data-account-id="${escapeHtml(account.id)}" data-account-type="stable">${
    account.status === "正常" ? "暂停账户" : "恢复账户"
  }</button>
        <button class="link-btn" data-accounts-view-ledger>查看账务记录</button>
      </div>
    </div>
  `;
}

function renderUnifiedPauseDrawer(entity) {
  const ua = entity.accountStructure.unifiedAccount;
  const pauseMode = ua.status === "已暂停" ? "resume" : "pause";
  return `
    <div class="inline-drawer">
      <h5>${pauseMode === "pause" ? "暂停全部账户" : "恢复全部账户"}</h5>
      <label>
        <span>${pauseMode === "pause" ? "暂停原因（必填）" : "恢复原因（必填）"}</span>
        <textarea class="filter-control" rows="2" data-accounts-pause-reason>${escapeHtml(accountsPauseReason)}</textarea>
      </label>
      ${
        pauseMode === "resume"
          ? `
        <label>
          <span>审批确认人（双人审核）</span>
          <select class="filter-control" data-accounts-resume-approver>
            <option value="">请选择</option>
            ${opsApproverOptions
              .filter((name) => name !== currentOps)
              .map((name) => `<option value="${escapeHtml(name)}" ${accountsResumeSecondApprover === name ? "selected" : ""}>${escapeHtml(name)}</option>`)
              .join("")}
          </select>
        </label>
      `
          : ""
      }
      <div class="section-actions">
        <button class="tab-btn" data-accounts-pause-cancel>取消</button>
        <button class="tab-btn active" data-accounts-pause-submit data-entity-id="${escapeHtml(entity.id)}">${
          pauseMode === "pause" ? "确认暂停" : "提交恢复"
        }</button>
      </div>
    </div>
  `;
}

function renderAddFiatDrawer(entity) {
  const structure = entity.accountStructure;
  const unlinkedBanks = structure.bankAccounts.filter((x) => x.status === "待关联");
  const selectedBank = unlinkedBanks.find((x) => x.id === accountsAddFiatBankId) || null;
  return `
    <div class="inline-drawer">
      <h5>新增法币账户 · Step ${accountsAddFiatStep} / 2</h5>
      ${
        accountsAddFiatStep === 1
          ? `
        ${
          unlinkedBanks.length
            ? `
          <label>
            <span>选择关联银行账户</span>
            <select class="filter-control" data-accounts-add-fiat-bank>
              <option value="">请选择</option>
              ${unlinkedBanks.map((x) => `<option value="${escapeHtml(x.id)}" ${accountsAddFiatBankId === x.id ? "selected" : ""}>${escapeHtml(x.bankName)} · ${escapeHtml(x.currency)}</option>`).join("")}
            </select>
          </label>
        `
            : `<p class="drawer-error">请先在「银行账户」Tab 中添加银行账户记录</p>`
        }
      `
          : `
        <div class="decision-grid">
          <p>关联银行：${escapeHtml(selectedBank?.bankName || "-")}</p>
          <p>币种：${escapeHtml(selectedBank?.currency || "-")}</p>
        </div>
      `
      }
      <div class="section-actions">
        <button class="tab-btn" data-accounts-add-fiat-cancel>取消</button>
        ${
          accountsAddFiatStep === 1
            ? `<button class="tab-btn active" data-accounts-add-fiat-next data-entity-id="${escapeHtml(entity.id)}">下一步</button>`
            : `<button class="tab-btn active" data-accounts-add-fiat-submit data-entity-id="${escapeHtml(entity.id)}">确认创建</button>`
        }
      </div>
    </div>
  `;
}

function renderAccountsBanksSubTab(entity) {
  const structure = entity.accountStructure;
  return `
    <section class="decision-panel">
      <div class="materials-group">
        <div class="compliance-file-table">
          <div class="compliance-file-row compliance-file-head"><span>银行名称</span><span>币种</span><span>账户状态</span><span>开立时间</span><span>关联法币账户 / 操作</span></div>
          ${structure.bankAccounts
            .map(
              (bank) => `
            <div class="compliance-file-row">
              <span>${escapeHtml(bank.bankName)}</span>
              <span>${escapeHtml(bank.currency)}</span>
              <span>${renderBankStatusPill(bank.status)}</span>
              <span>${escapeHtml(bank.openedAt)}</span>
              <div class="section-actions">
                <span>${escapeHtml(bank.linkedFiatAccountId || "未创建")}</span>
                ${
                  bank.status === "待关联"
                    ? `<button class="tab-btn active" data-accounts-bank-associate data-entity-id="${escapeHtml(entity.id)}" data-bank-id="${escapeHtml(
                        bank.id
                      )}">关联</button>`
                    : `<button class="link-btn">查看</button>`
                }
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
      <div class="section-actions">
        <button class="tab-btn" data-accounts-open-add-bank data-entity-id="${escapeHtml(entity.id)}">＋ 添加银行账户记录</button>
      </div>
    </section>
  `;
}

function renderAddBankDrawer(entity) {
  return `
    <div class="inline-drawer">
      <h5>添加银行账户记录</h5>
      <label>
        <span>银行名称（必填）</span>
        <select class="filter-control" data-accounts-add-bank-name>
          <option value="">请选择</option>
          ${["DBS HK", "HSBC HK", "Standard Chartered HK"].map((x) => `<option value="${x}" ${accountsAddBankName === x ? "selected" : ""}>${x}</option>`).join("")}
        </select>
      </label>
      <label>
        <span>币种（必填）</span>
        <select class="filter-control" data-accounts-add-bank-currency>
          <option value="">请选择</option>
          ${["HKD", "USD", "EUR", "SGD"].map((x) => `<option value="${x}" ${accountsAddBankCurrency === x ? "selected" : ""}>${x}</option>`).join("")}
        </select>
      </label>
      <label>
        <span>开立时间（必填）</span>
        <input class="filter-control" type="date" data-accounts-add-bank-date value="${escapeHtml(accountsAddBankOpenDate)}" />
      </label>
      <label>
        <span>备注（选填）</span>
        <textarea class="filter-control" rows="2" data-accounts-add-bank-note>${escapeHtml(accountsAddBankNote)}</textarea>
      </label>
      <label>
        <input type="checkbox" data-accounts-add-bank-auto-fiat ${accountsAutoCreateFiat ? "checked" : ""} />
        是否立即创建对应法币账户
      </label>
      <div class="section-actions">
        <button class="tab-btn" data-accounts-add-bank-cancel>取消</button>
        <button class="tab-btn active" data-accounts-add-bank-submit data-entity-id="${escapeHtml(entity.id)}">提交</button>
      </div>
    </div>
  `;
}

function renderAccountsWhitelistSubTab(entity) {
  const filter = accountsWhitelistFilterByEntity[entity.id] || { type: "all", status: "all" };
  const structure = entity.accountStructure;
  const list = structure.whitelistEntries.filter((x) => {
    const passType = filter.type === "all" || x.type === filter.type;
    const passStatus = filter.status === "all" || x.status === filter.status;
    return passType && passStatus;
  });
  return `
    <section class="decision-panel">
      <div class="decision-grid">
        <p>法币提现白名单：${structure.whitelistConfig.fiatEnabled ? "已开启" : "已关闭"}</p>
        <p>稳定币提币白名单：${structure.whitelistConfig.stableEnabled ? "已开启" : "已关闭"}</p>
        <p>豁免金额：${escapeHtml(String(structure.whitelistConfig.exemptAmountUsd))} USD</p>
      </div>
      <div class="filter-row">
        <label class="filter-block">
          <span class="filter-label">类型</span>
          <select class="filter-control" data-accounts-whitelist-type-filter="${escapeHtml(entity.id)}">
            ${["all", "法币", "稳定币"]
              .map((x) => `<option value="${x}" ${filter.type === x ? "selected" : ""}>${x === "all" ? "全部" : x}</option>`)
              .join("")}
          </select>
        </label>
        <label class="filter-block">
          <span class="filter-label">状态</span>
          <select class="filter-control" data-accounts-whitelist-status-filter="${escapeHtml(entity.id)}">
            ${["all", "待审核", "已审核", "已拒绝"]
              .map((x) => `<option value="${x}" ${filter.status === x ? "selected" : ""}>${x === "all" ? "全部" : x}</option>`)
              .join("")}
          </select>
        </label>
      </div>
      <div class="materials-group">
        <div class="compliance-file-table">
          <div class="compliance-file-row compliance-file-head"><span>类型</span><span>名称 / 地址</span><span>币种</span><span>状态</span><span>操作</span></div>
          ${list
            .map(
              (row) => `
            <div class="compliance-file-row">
              <span>${escapeHtml(row.type)}</span>
              <span>${escapeHtml(row.nameOrAddress)}</span>
              <span>${escapeHtml(row.currency || "—")}</span>
              <span>${renderWhitelistStatusPill(row.status)}</span>
              <button class="tab-btn ${row.status === "待审核" ? "active" : ""}" data-accounts-whitelist-open-review data-entity-id="${escapeHtml(
                entity.id
              )}" data-entry-id="${escapeHtml(row.id)}">${row.status === "待审核" ? "审核" : "查看"}</button>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
      <p class="sort-hint">⚠ 白名单由商户在 Merchant Portal 自助添加，Ops 负责审核</p>
    </section>
  `;
}

function renderAccountsRightDrawer(merchant) {
  let panel = "";

  if (accountsManageEntityId && accountsManageAccountId) {
    const entity = merchant.legalEntities.find((x) => x.id === accountsManageEntityId) || null;
    const found = entity ? findSubAccount(entity, accountsManageAccountId) : null;
    if (entity && found) {
      const paused = entity.accountStructure.unifiedAccount.status === "已暂停";
      panel = found.kind === "fiat" ? renderFiatAccountManagePanel(entity, found.ref, paused) : renderStableAccountManagePanel(entity, found.ref, paused);
    }
  } else if (accountsPauseDrawerEntityId) {
    const entity = merchant.legalEntities.find((x) => x.id === accountsPauseDrawerEntityId) || null;
    if (entity) panel = renderUnifiedPauseDrawer(entity);
  } else if (accountsAddFiatDrawerEntityId) {
    const entity = merchant.legalEntities.find((x) => x.id === accountsAddFiatDrawerEntityId) || null;
    if (entity) panel = renderAddFiatDrawer(entity);
  } else if (accountsAddBankDrawerEntityId) {
    const entity = merchant.legalEntities.find((x) => x.id === accountsAddBankDrawerEntityId) || null;
    if (entity) panel = renderAddBankDrawer(entity);
  } else if (accountsWhitelistReviewEntityId && accountsWhitelistReviewEntryId) {
    const entity = merchant.legalEntities.find((x) => x.id === accountsWhitelistReviewEntityId) || null;
    const entry = entity ? entity.accountStructure.whitelistEntries.find((x) => x.id === accountsWhitelistReviewEntryId) || null : null;
    if (entity && entry) panel = renderWhitelistReviewPanel(entity, entry);
  }

  if (!panel) return "";

  return `
    <div class="accounts-side-mask" data-accounts-drawer-close></div>
    <aside class="drawer accounts-side-drawer">
      <div class="drawer-head">
        <h3>操作面板</h3>
        <button class="tab-btn" data-accounts-drawer-close>关闭</button>
      </div>
      ${panel}
    </aside>
  `;
}

function renderWhitelistReviewPanel(entity, entry) {
  return `
    <div class="inline-drawer">
      <h5>${escapeHtml(entry.type)}白名单审核</h5>
      <div class="decision-grid">
        ${
          entry.type === "法币"
            ? `
          <p>收款方：${escapeHtml(entry.nameOrAddress)}</p>
          <p>银行名称：${escapeHtml(entry.bankName || "-")}</p>
          <p>账号（脱敏）：${escapeHtml(entry.accountMasked || "-")}</p>
          <p>币种：${escapeHtml(entry.currency || "-")}</p>
        `
            : `
          <p>链上地址：${escapeHtml(entry.address || "-")}</p>
          <p>Token：${escapeHtml(entry.token || "-")}</p>
          <p>KYT 风险评分：${entry.kytScore ? `${entry.kytScore} / 100` : "暂无"}</p>
        `
        }
      </div>
      <label>
        <span>审核意见</span>
        <textarea class="filter-control" rows="2" data-accounts-whitelist-review-comment>${escapeHtml(accountsWhitelistReviewComment)}</textarea>
      </label>
      <div class="section-actions">
        <button class="tab-btn" data-accounts-whitelist-reject data-entity-id="${escapeHtml(entity.id)}" data-entry-id="${escapeHtml(entry.id)}">拒绝并说明原因</button>
        <button class="tab-btn active" data-accounts-whitelist-approve data-entity-id="${escapeHtml(entity.id)}" data-entry-id="${escapeHtml(entry.id)}">通过</button>
      </div>
    </div>
  `;
}

function maskAddress(address) {
  if (!address || address.length < 10) return address || "-";
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

function renderBankStatusPill(status) {
  if (status === "有效") return `<span class="tag success">有效</span>`;
  if (status === "待关联") return `<span class="tag warning">待关联</span>`;
  return `<span class="tag muted">已关闭</span>`;
}

function renderWhitelistStatusPill(status) {
  if (status === "已审核") return `<span class="tag success">已审核</span>`;
  if (status === "待审核") return `<span class="tag pending">待审核</span>`;
  return `<span class="tag muted">已拒绝</span>`;
}

function getAccountStructureEntity(entityId) {
  return getEntityById(entityId);
}

function clearAccountsDrawerState() {
  accountsManageEntityId = "";
  accountsManageAccountId = "";
  accountsPauseDrawerEntityId = "";
  accountsPauseMode = "pause";
  accountsPauseReason = "";
  accountsResumeSecondApprover = "";
  accountsAddBankDrawerEntityId = "";
  accountsAddBankName = "";
  accountsAddBankCurrency = "";
  accountsAddBankOpenDate = "";
  accountsAddBankNote = "";
  accountsAutoCreateFiat = true;
  accountsAddFiatDrawerEntityId = "";
  accountsAddFiatStep = 1;
  accountsAddFiatBankId = "";
  accountsWhitelistReviewEntityId = "";
  accountsWhitelistReviewEntryId = "";
  accountsWhitelistReviewComment = "";
}

function findSubAccount(entity, accountId) {
  const fiat = entity.accountStructure.fiatAccounts.find((x) => x.id === accountId);
  if (fiat) return { kind: "fiat", ref: fiat };
  const stable = entity.accountStructure.stableAccounts.find((x) => x.id === accountId);
  if (stable) return { kind: "stable", ref: stable };
  return null;
}

function toggleAccountDirection(entityId, accountId, direction) {
  const entity = getAccountStructureEntity(entityId);
  if (!entity) return;
  if (entity.accountStructure.unifiedAccount.status === "已暂停") return;
  const found = findSubAccount(entity, accountId);
  if (!found) return;
  if (direction === "deposit") found.ref.canDeposit = !found.ref.canDeposit;
  if (direction === "withdraw") found.ref.canWithdraw = !found.ref.canWithdraw;
  pushAuditLog(
    getSelectedMerchant().profileAuditLogs,
    "账户开关变更",
    `${found.ref.id}`,
    `${direction === "deposit" ? "充值" : "提现"}=${direction === "deposit" ? found.ref.canDeposit : found.ref.canWithdraw}`
  );
  renderApp();
}

function toggleSubAccountStatus(entityId, accountId) {
  const entity = getAccountStructureEntity(entityId);
  if (!entity) return;
  if (entity.accountStructure.unifiedAccount.status === "已暂停") return;
  const found = findSubAccount(entity, accountId);
  if (!found) return;
  const before = found.ref.status;
  found.ref.status = before === "正常" ? "已暂停" : "正常";
  entity.contractChangeLogs.unshift({
    at: new Date().toISOString(),
    actor: currentOps,
    action: "子账户状态变更",
    detail: `${found.ref.id}：${before} → ${found.ref.status}`,
  });
  pushAuditLog(getSelectedMerchant().profileAuditLogs, "子账户状态变更", before, found.ref.status);
  renderApp();
}

function submitUnifiedAccountPause(entityId) {
  const entity = getAccountStructureEntity(entityId);
  if (!entity) return;
  const ua = entity.accountStructure.unifiedAccount;
  const reason = accountsPauseReason.trim();
  if (!reason) {
    pageFlashMessage = "请填写原因。";
    renderApp();
    return;
  }
  if (ua.status !== "已暂停") {
    ua.status = "已暂停";
    entity.accountStructure.assetAccount.status = "已暂停";
    entity.accountStructure.fiatAccounts.forEach((x) => {
      x.status = "已暂停";
      x.canDeposit = false;
      x.canWithdraw = false;
    });
    entity.accountStructure.stableAccounts.forEach((x) => {
      x.status = "已暂停";
      x.canDeposit = false;
      x.canWithdraw = false;
    });
    entity.contractChangeLogs.unshift({
      at: new Date().toISOString(),
      actor: currentOps,
      action: "暂停全部账户",
      detail: `UnifiedAccount ${ua.id}：正常 → 已暂停；原因：${reason}`,
    });
    pushAuditLog(getSelectedMerchant().profileAuditLogs, "暂停全部账户", ua.id, reason);
    pageFlashMessage = "已暂停 UnifiedAccount 及旗下所有账户。";
  } else {
    if (!accountsResumeSecondApprover) {
      pageFlashMessage = "恢复需选择审批确认人。";
      renderApp();
      return;
    }
    ua.status = "正常";
    entity.accountStructure.assetAccount.status = "正常";
    entity.accountStructure.fiatAccounts.forEach((x) => {
      x.status = "正常";
      x.canDeposit = true;
      x.canWithdraw = true;
    });
    entity.accountStructure.stableAccounts.forEach((x) => {
      x.status = "正常";
      x.canDeposit = true;
      x.canWithdraw = true;
    });
    entity.contractChangeLogs.unshift({
      at: new Date().toISOString(),
      actor: currentOps,
      action: "恢复全部账户",
      detail: `UnifiedAccount ${ua.id}：已暂停 → 正常；原因：${reason}；二审：${accountsResumeSecondApprover}`,
    });
    pushAuditLog(getSelectedMerchant().profileAuditLogs, "恢复全部账户", ua.id, reason);
    pageFlashMessage = "恢复申请已通过双人审核，全部账户已恢复。";
  }
  accountsPauseDrawerEntityId = "";
  accountsPauseReason = "";
  accountsResumeSecondApprover = "";
  renderApp();
}

function moveAddFiatStep(entityId) {
  const entity = getAccountStructureEntity(entityId);
  if (!entity) return;
  const unlinked = entity.accountStructure.bankAccounts.find((x) => x.id === accountsAddFiatBankId && x.status === "待关联");
  if (!unlinked) {
    pageFlashMessage = "请选择可关联的银行账户。";
    renderApp();
    return;
  }
  accountsAddFiatStep = 2;
  renderApp();
}

function submitAddFiatAccount(entityId) {
  const entity = getAccountStructureEntity(entityId);
  if (!entity) return;
  const bank = entity.accountStructure.bankAccounts.find((x) => x.id === accountsAddFiatBankId && x.status === "待关联");
  if (!bank) return;
  const seq = String(entity.accountStructure.fiatAccounts.length + 1).padStart(3, "0");
  const key = entity.accountStructure.unifiedAccount.id.split("-").slice(1).join("-");
  const fiatId = `FAC-${key}-${bank.currency}-${seq}`;
  entity.accountStructure.fiatAccounts.push({
    id: fiatId,
    currency: bank.currency,
    virtualAccountNo: `888-${key}-${bank.currency}-${seq}`,
    provider: bank.bankName,
    canDeposit: true,
    canWithdraw: true,
    status: "正常",
    openedAt: formatDate(new Date().toISOString()).replace(/\//g, "-"),
    linkedBankAccountId: bank.id,
  });
  bank.status = "有效";
  bank.linkedFiatAccountId = fiatId;
  entity.contractChangeLogs.unshift({
    at: new Date().toISOString(),
    actor: currentOps,
    action: "新增法币账户",
    detail: `${bank.currency} · ${fiatId}（同步账务域初始化台账）`,
  });
  pushAuditLog(getSelectedMerchant().profileAuditLogs, "新增法币账户", bank.id, fiatId);
  accountsAddFiatDrawerEntityId = "";
  accountsAddFiatStep = 1;
  accountsAddFiatBankId = "";
  pageFlashMessage = "法币账户已创建并同步账务域。";
  renderApp();
}

function submitAddBankRecord(entityId) {
  const entity = getAccountStructureEntity(entityId);
  if (!entity) return;
  if (!accountsAddBankName || !accountsAddBankCurrency || !accountsAddBankOpenDate) {
    pageFlashMessage = "请填写银行名称、币种和开立时间。";
    renderApp();
    return;
  }
  const seq = String(entity.accountStructure.bankAccounts.length + 1).padStart(3, "0");
  const key = entity.accountStructure.unifiedAccount.id.split("-").slice(1).join("-");
  const bankId = `CBA-${key}-${accountsAddBankCurrency}-${seq}`;
  const row = {
    id: bankId,
    bankName: accountsAddBankName,
    currency: accountsAddBankCurrency,
    status: "待关联",
    openedAt: accountsAddBankOpenDate,
    linkedFiatAccountId: "",
    note: accountsAddBankNote,
  };
  entity.accountStructure.bankAccounts.unshift(row);
  entity.contractChangeLogs.unshift({
    at: new Date().toISOString(),
    actor: currentOps,
    action: "添加银行账户记录",
    detail: `${accountsAddBankName} · ${accountsAddBankCurrency}`,
  });
  if (accountsAutoCreateFiat) {
    accountsAddFiatBankId = bankId;
    accountsAddFiatDrawerEntityId = entityId;
    accountsAddFiatStep = 2;
    accountsAddBankDrawerEntityId = "";
    pageFlashMessage = "银行账户记录已创建，正在创建对应法币账户。";
    submitAddFiatAccount(entityId);
    return;
  }
  accountsAddBankDrawerEntityId = "";
  pageFlashMessage = "银行账户记录已创建，可在列表中手动关联法币账户。";
  renderApp();
}

function associateBankToFiat(entityId, bankId) {
  const entity = getAccountStructureEntity(entityId);
  if (!entity) return;
  clearAccountsDrawerState();
  accountsAddFiatDrawerEntityId = entityId;
  accountsAddFiatStep = 2;
  accountsAddFiatBankId = bankId;
  renderApp();
}

function reviewWhitelistEntry(entityId, entryId, action) {
  const entity = getAccountStructureEntity(entityId);
  if (!entity) return;
  const row = entity.accountStructure.whitelistEntries.find((x) => x.id === entryId);
  if (!row) return;
  if (action === "通过") {
    row.status = "已审核";
    pageFlashMessage = "白名单条目已审核通过，商户可使用该条目出金。";
  } else {
    row.status = "已拒绝";
    pageFlashMessage = "白名单条目已拒绝并通知商户。";
  }
  entity.contractChangeLogs.unshift({
    at: new Date().toISOString(),
    actor: currentOps,
    action: "白名单审核",
    detail: `${row.type}条目 ${row.nameOrAddress}：${action}；${accountsWhitelistReviewComment || "无备注"}`,
  });
  pushAuditLog(getSelectedMerchant().profileAuditLogs, "白名单审核", row.id, row.status);
  accountsWhitelistReviewEntityId = "";
  accountsWhitelistReviewEntryId = "";
  accountsWhitelistReviewComment = "";
  renderApp();
}

function ensureMembersExpansionState(merchant) {
  if (membersExpandedForMerchantId !== merchant.id) {
    membersExpandedEntityIds.clear();
    merchant.legalEntities.forEach((entity) => {
      const pendingAppointments = entity.memberCenter.appointmentRequests.some(
        (item) => item.status === "KYC 进行中" || item.status === "待主管确认"
      );
      if (pendingAppointments) membersExpandedEntityIds.add(entity.id);
      if (!membersSubTabByEntity[entity.id]) membersSubTabByEntity[entity.id] = "members";
      if (!membersFilterByEntity[entity.id]) {
        membersFilterByEntity[entity.id] = { role: "all", status: "all", country: "all" };
      }
      if (typeof membersShowRemovedByEntity[entity.id] === "undefined") {
        membersShowRemovedByEntity[entity.id] = false;
      }
    });
    membersExpandedForMerchantId = merchant.id;
    membersDetailEntityId = "";
    membersDetailMemberId = "";
    membersAppointmentDetailEntityId = "";
    membersAppointmentDetailId = "";
    membersApiKeyDetailEntityId = "";
    membersApiKeyDetailId = "";
    membersNewAppointmentDrawerEntityId = "";
  }
}

function renderMerchantMembersTab(merchant) {
  ensureMembersExpansionState(merchant);
  return `
    <section class="merchant-tab-grid">
      <section class="kyb-license-blocks">
        ${merchant.legalEntities
          .map((entity) => {
            const expanded = membersExpandedEntityIds.has(entity.id);
            const subTab = membersSubTabByEntity[entity.id] || "members";
            const pendingCount = entity.memberCenter.appointmentRequests.filter(
              (item) => item.status === "KYC 进行中" || item.status === "待主管确认"
            ).length;
            return `
              <article class="card kyb-license-block ${pendingCount ? "focused" : ""}">
                <div class="kyb-license-head">
                  <div>
                    <h5>${escapeHtml(entity.licenseName)} ${pendingCount ? `<span class="tag warning">${pendingCount} 个待处理工单</span>` : ""}</h5>
                  </div>
                  <button class="tab-btn" data-members-entity-toggle="${escapeHtml(entity.id)}">${expanded ? "折叠" : "展开"}</button>
                </div>
                ${
                  expanded
                    ? `
                  <div class="tabs tabs-strong">
                    ${[
                      ["members", "成员列表"],
                      ["appointments", "Admin 任命"],
                      ["apikeys", "API Key"],
                    ]
                      .map(
                        ([tabId, label]) =>
                          `<button class="tab-btn ${subTab === tabId ? "active" : ""}" data-members-subtab="${tabId}" data-entity-id="${escapeHtml(
                            entity.id
                          )}">${label}</button>`
                      )
                      .join("")}
                  </div>
                  <div class="kyb-subtab-content">
                    ${
                      subTab === "members"
                        ? renderMembersListSubTab(entity)
                        : subTab === "appointments"
                          ? renderAdminAppointmentsSubTab(entity)
                          : renderApiKeysSubTab(entity)
                    }
                  </div>
                `
                    : ""
                }
              </article>
            `;
          })
          .join("")}
      </section>
    </section>
  `;
}

function renderMembersListSubTab(entity) {
  const filter = membersFilterByEntity[entity.id] || { role: "all", status: "all", country: "all" };
  const showRemoved = membersShowRemovedByEntity[entity.id];
  const countries = [...new Set(entity.memberCenter.members.map((item) => item.country).filter(Boolean))];
  const members = entity.memberCenter.members.filter((item) => {
    if (!showRemoved && item.status === "已移除") return false;
    if (filter.role !== "all" && item.role !== filter.role) return false;
    if (filter.status !== "all" && item.status !== filter.status) return false;
    if (filter.country !== "all" && item.country !== filter.country) return false;
    return true;
  });
  const selectedMember =
    membersDetailEntityId === entity.id ? entity.memberCenter.members.find((item) => item.id === membersDetailMemberId) || null : null;

  return `
    <section class="decision-panel">
      ${
        entity.memberCenter.groupAdmin
          ? `
        <div class="decision-grid">
          <p><strong>集团级管理员 · 跨牌照：</strong>${escapeHtml(entity.memberCenter.groupAdmin.name)}（${escapeHtml(
              entity.memberCenter.groupAdmin.email
            )}）</p>
        </div>
      `
          : ""
      }
      <div class="filter-row">
        <label class="filter-block">
          <span class="filter-label">角色</span>
          <select class="filter-control" data-members-role-filter="${escapeHtml(entity.id)}">
            ${["all", "Admin", "Member"]
              .map((item) => `<option value="${item}" ${filter.role === item ? "selected" : ""}>${item === "all" ? "全部" : item}</option>`)
              .join("")}
          </select>
        </label>
        <label class="filter-block">
          <span class="filter-label">状态</span>
          <select class="filter-control" data-members-status-filter="${escapeHtml(entity.id)}">
            ${["all", "活跃", "已邀请", "已暂停", "已移除"]
              .map((item) => `<option value="${item}" ${filter.status === item ? "selected" : ""}>${item === "all" ? "全部" : item}</option>`)
              .join("")}
          </select>
        </label>
        <label class="filter-block">
          <span class="filter-label">国家</span>
          <select class="filter-control" data-members-country-filter="${escapeHtml(entity.id)}">
            <option value="all">全部</option>
            ${countries
              .map((item) => `<option value="${escapeHtml(item)}" ${filter.country === item ? "selected" : ""}>${escapeHtml(item)}</option>`)
              .join("")}
          </select>
        </label>
      </div>

      <div class="materials-group">
        <div class="compliance-file-table">
          <div class="compliance-file-row compliance-file-head"><span>姓名</span><span>邮箱</span><span>角色</span><span>状态</span><span>操作</span></div>
          ${members
            .map(
              (row) => `
            <div class="compliance-file-row">
              <span>${escapeHtml(row.name)}</span>
              <span>${escapeHtml(row.email)}</span>
              <span>${escapeHtml(row.role)}</span>
              <span>${renderMemberStatusPill(row.status)}</span>
              <button class="tab-btn" data-members-open-detail data-entity-id="${escapeHtml(entity.id)}" data-member-id="${escapeHtml(
                row.id
              )}">查看</button>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
      <p class="sort-hint">共 ${members.length} 名成员</p>
      <label class="table-toggle">
        <input type="checkbox" data-members-show-removed="${escapeHtml(entity.id)}" ${showRemoved ? "checked" : ""} />
        显示已移除成员
      </label>

      ${selectedMember ? renderMemberDetailPanel(entity, selectedMember) : ""}
    </section>
  `;
}

function renderMemberDetailPanel(entity, member) {
  const isAdmin = member.role === "Admin";
  const canToggle = member.status !== "已移除";
  const toggleLabel = member.status === "已暂停" ? "恢复该成员" : "强制暂停该成员";
  return `
    <aside class="inline-drawer">
      <h5>${escapeHtml(member.name)} · ${escapeHtml(member.role)}</h5>
      <div class="decision-grid">
        <p>姓名：${escapeHtml(member.name)}</p>
        <p>邮箱：${escapeHtml(member.email)}</p>
        <p>职位：${escapeHtml(member.title || "-")}</p>
        <p>所在国家：${escapeHtml(member.country || "-")}</p>
        <p>加入时间：${escapeHtml(member.joinedAt || "-")}</p>
        <p>最后登录：${member.lastLoginAt ? escapeHtml(formatExactTime(member.lastLoginAt)) : "未登录"}</p>
      </div>
      <div class="decision-grid">
        <p>角色：${escapeHtml(member.role)}</p>
        ${
          isAdmin
            ? `
          <p>KYC 状态：${escapeHtml(member.kycStatus || "待验证")} ${member.kycVerifiedAt ? `（${escapeHtml(member.kycVerifiedAt)}）` : ""}</p>
          <p>任命工单：${escapeHtml(member.appointmentId || "-")} ${member.appointmentId ? `<button class="link-btn" data-members-open-appointment data-entity-id="${escapeHtml(
                entity.id
              )}" data-appointment-id="${escapeHtml(member.appointmentId)}">查看工单 →</button>` : ""}</p>
          <p>权限配置（只读）：全部页面 View / Edit / Review</p>
        `
            : `
          <p>适用角色模板：${escapeHtml(member.roleTemplate || "-")}</p>
          ${(member.permissions || [])
            .map((perm) => `<p>${escapeHtml(perm.page)}：${escapeHtml(perm.scopes)}</p>`)
            .join("")}
        `
        }
      </div>
      <div class="section-actions">
        <button class="tab-btn" data-members-toggle-status data-entity-id="${escapeHtml(entity.id)}" data-member-id="${escapeHtml(
          member.id
        )}" ${canToggle ? "" : "disabled"}>${toggleLabel}</button>
        <button class="link-btn" data-members-view-audit data-member-id="${escapeHtml(member.id)}">查看该成员的操作审计日志</button>
      </div>
    </aside>
  `;
}

function renderAdminAppointmentsSubTab(entity) {
  const activeAdmins = entity.memberCenter.members.filter((item) => item.role === "Admin" && item.status === "活跃");
  const selectedRequest =
    membersAppointmentDetailEntityId === entity.id
      ? entity.memberCenter.appointmentRequests.find((item) => item.id === membersAppointmentDetailId) || null
      : null;
  return `
    <section class="decision-panel">
      <div class="materials-group">
        <h6>当前 Admin</h6>
        <div class="compliance-file-table">
          <div class="compliance-file-row compliance-file-head"><span>姓名</span><span>KYC 状态</span><span>任命时间</span><span>状态</span><span>操作</span></div>
          ${activeAdmins
            .map(
              (row) => `
            <div class="compliance-file-row">
              <span>${escapeHtml(row.name)}</span>
              <span>${escapeHtml(row.kycStatus || "待验证")}</span>
              <span>${escapeHtml(row.kycVerifiedAt || row.joinedAt || "-")}</span>
              <span>${renderMemberStatusPill(row.status)}</span>
              <button class="tab-btn" data-members-open-detail data-entity-id="${escapeHtml(entity.id)}" data-member-id="${escapeHtml(
                row.id
              )}">查看</button>
            </div>
          `
            )
            .join("")}
        </div>
      </div>

      <div class="materials-group">
        <div class="section-head">
          <h6>任命工单</h6>
          <button class="tab-btn active" data-members-open-new-appointment data-entity-id="${escapeHtml(entity.id)}">＋ 发起新任命工单</button>
        </div>
        <div class="compliance-file-table">
          <div class="compliance-file-row compliance-file-head"><span>工单编号</span><span>被提名人</span><span>状态</span><span>提交时间</span><span>操作</span></div>
          ${entity.memberCenter.appointmentRequests
            .map(
              (row) => `
            <div class="compliance-file-row">
              <span>${escapeHtml(row.id)}</span>
              <span>${escapeHtml(row.nomineeName)}</span>
              <span>${renderAppointmentStatusPill(row.status)}</span>
              <span>${escapeHtml(formatDate(row.submittedAt))}</span>
              <button class="tab-btn ${row.status !== "已完成" ? "active" : ""}" data-members-open-appointment data-entity-id="${escapeHtml(
                entity.id
              )}" data-appointment-id="${escapeHtml(row.id)}">${row.status === "已完成" ? "查看" : "处理"}</button>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
      ${selectedRequest ? renderAppointmentDetailPanel(entity, selectedRequest) : ""}
      ${membersNewAppointmentDrawerEntityId === entity.id ? renderNewAppointmentDrawer(entity) : ""}
    </section>
  `;
}

function renderAppointmentDetailPanel(entity, request) {
  const showSecondApproval = request.status === "待主管确认";
  return `
    <aside class="inline-drawer">
      <h5>任命工单 · ${escapeHtml(request.id)}</h5>
      <div class="decision-grid">
        <p>提交时间：${escapeHtml(formatExactTime(request.submittedAt))}</p>
        <p>当前状态：${escapeHtml(request.status)}</p>
        <p>被提名人：${escapeHtml(request.nomineeName)}</p>
        <p>邮箱：${escapeHtml(request.nomineeEmail)}</p>
        <p>职位：${escapeHtml(request.nomineeTitle || "-")}</p>
      </div>
      <div class="decision-grid">
        <p>公司任命函：${escapeHtml(request.companyLetterFile)} <button class="link-btn">查看</button></p>
        <p>被提名人证件：${escapeHtml(request.idFile)} <button class="link-btn">查看</button></p>
      </div>
      <div class="decision-grid">
        <label>
          <span>证件核验</span>
          <select class="filter-control" data-members-appointment-check data-entity-id="${escapeHtml(entity.id)}" data-appointment-id="${escapeHtml(
            request.id
          )}" data-check-key="identity" ${request.status === "已完成" || request.status === "已拒绝" ? "disabled" : ""}>
            ${["通过", "未通过"].map((item) => `<option value="${item}" ${request.kycChecks.identity === item ? "selected" : ""}>${item}</option>`).join("")}
          </select>
        </label>
        <label>
          <span>制裁筛查</span>
          <select class="filter-control" data-members-appointment-check data-entity-id="${escapeHtml(entity.id)}" data-appointment-id="${escapeHtml(
            request.id
          )}" data-check-key="sanction" ${request.status === "已完成" || request.status === "已拒绝" ? "disabled" : ""}>
            ${["通过", "未通过"].map((item) => `<option value="${item}" ${request.kycChecks.sanction === item ? "selected" : ""}>${item}</option>`).join("")}
          </select>
        </label>
        <label>
          <span>PEP 筛查</span>
          <select class="filter-control" data-members-appointment-check data-entity-id="${escapeHtml(entity.id)}" data-appointment-id="${escapeHtml(
            request.id
          )}" data-check-key="pep" ${request.status === "已完成" || request.status === "已拒绝" ? "disabled" : ""}>
            ${["通过", "未通过"].map((item) => `<option value="${item}" ${request.kycChecks.pep === item ? "selected" : ""}>${item}</option>`).join("")}
          </select>
        </label>
        <p>KYC 结论：${escapeHtml(request.kycConclusion || "待确认")}</p>
      </div>
      ${
        showSecondApproval
          ? `
        <label>
          <span>Ops 主管确认人（不可与执行人相同）</span>
          <select class="filter-control" data-members-appointment-second-approver>
            <option value="">请选择</option>
            ${opsApproverOptions
              .filter((item) => item !== currentOps)
              .map((item) => `<option value="${escapeHtml(item)}" ${membersAppointmentSecondApprover === item ? "selected" : ""}>${escapeHtml(item)}</option>`)
              .join("")}
          </select>
        </label>
      `
          : ""
      }
      <div class="section-actions">
        ${
          request.status === "KYC 进行中"
            ? `
          <button class="tab-btn" data-members-appointment-reject data-entity-id="${escapeHtml(entity.id)}" data-appointment-id="${escapeHtml(
                request.id
              )}">✗ KYC 未通过</button>
          <button class="tab-btn active" data-members-appointment-pass data-entity-id="${escapeHtml(entity.id)}" data-appointment-id="${escapeHtml(
                request.id
              )}">✓ KYC 通过</button>
        `
            : showSecondApproval
              ? `<button class="tab-btn active" data-members-appointment-confirm data-entity-id="${escapeHtml(entity.id)}" data-appointment-id="${escapeHtml(
                  request.id
                )}">完成任命确认</button>`
              : ""
        }
      </div>
    </aside>
  `;
}

function renderNewAppointmentDrawer(entity) {
  return `
    <aside class="inline-drawer">
      <h5>发起新任命工单</h5>
      <label>
        <span>被提名人姓名（必填）</span>
        <input class="filter-control" data-members-new-name value="${escapeHtml(membersAppointeeName)}" />
      </label>
      <label>
        <span>被提名人邮箱（必填）</span>
        <input class="filter-control" type="email" data-members-new-email value="${escapeHtml(membersAppointeeEmail)}" />
      </label>
      <label>
        <span>被提名人职位（选填）</span>
        <input class="filter-control" data-members-new-title value="${escapeHtml(membersAppointeeTitle)}" />
      </label>
      <label>
        <span>上传公司任命函（必填）</span>
        <input class="filter-control" placeholder="appointment_letter.pdf" data-members-new-letter value="${escapeHtml(membersAppointmentLetterName)}" />
      </label>
      <label>
        <span>上传被提名人证件（必填）</span>
        <input class="filter-control" placeholder="passport_xxx.pdf" data-members-new-idfile value="${escapeHtml(membersAppointeeIdFileName)}" />
      </label>
      <div class="section-actions">
        <button class="tab-btn" data-members-new-appointment-cancel>取消</button>
        <button class="tab-btn active" data-members-new-appointment-submit data-entity-id="${escapeHtml(entity.id)}">提交工单</button>
      </div>
    </aside>
  `;
}

function renderApiKeysSubTab(entity) {
  const selectedKey =
    membersApiKeyDetailEntityId === entity.id ? entity.memberCenter.apiKeys.find((item) => item.id === membersApiKeyDetailId) || null : null;
  return `
    <section class="decision-panel">
      <div class="materials-group">
        <div class="compliance-file-table">
          <div class="compliance-file-row compliance-file-head"><span>Key 名称</span><span>环境</span><span>创建人</span><span>状态</span><span>操作</span></div>
          ${entity.memberCenter.apiKeys
            .map(
              (row) => `
            <div class="compliance-file-row">
              <span>${escapeHtml(row.name)}</span>
              <span>${escapeHtml(row.env)}</span>
              <span>${escapeHtml(row.creator)}</span>
              <span>${renderApiKeyStatusPill(row.status)}</span>
              <button class="tab-btn" data-members-open-apikey data-entity-id="${escapeHtml(entity.id)}" data-key-id="${escapeHtml(row.id)}">查看</button>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
      <p class="sort-hint">⚠ API Key 的创建和管理由商户 Admin 在 Merchant Portal 执行，Ops 仅可查看和吊销。</p>
      ${selectedKey ? renderApiKeyDetailPanel(entity, selectedKey) : ""}
    </section>
  `;
}

function renderApiKeyDetailPanel(entity, key) {
  return `
    <aside class="inline-drawer">
      <h5>${escapeHtml(key.name)} · 详情</h5>
      <div class="decision-grid">
        <p>Key 名称：${escapeHtml(key.name)}</p>
        <p>Key 前缀：${escapeHtml(key.keyPrefix)}</p>
        <p>环境：${escapeHtml(key.env)}</p>
        <p>创建人：${escapeHtml(key.creator)}</p>
        <p>创建时间：${escapeHtml(formatExactTime(key.createdAt))}</p>
        <p>最后使用：${escapeHtml(formatExactTime(key.lastUsedAt))}</p>
        <p>到期时间：${escapeHtml(key.expiryAt)}</p>
        <p>IP 白名单：${escapeHtml((key.ipWhitelist || []).join(" · ") || "—")}</p>
      </div>
      <div class="decision-grid">
        ${(key.scopes || [])
          .map((scope) => `<p>${escapeHtml(scope.name)}：${scope.enabled ? "● 有权限" : "✗ 无权限"}</p>`)
          .join("")}
      </div>
      <div class="section-actions">
        <button class="tab-btn ${key.status === "已吊销" ? "" : "active"}" data-members-force-revoke-key data-entity-id="${escapeHtml(
          entity.id
        )}" data-key-id="${escapeHtml(key.id)}" ${key.status === "已吊销" ? "disabled" : ""}>强制吊销此 Key</button>
      </div>
    </aside>
  `;
}

function renderMemberStatusPill(status) {
  if (status === "活跃") return `<span class="tag success">活跃</span>`;
  if (status === "已邀请") return `<span class="tag pending">已邀请</span>`;
  if (status === "已暂停") return `<span class="tag warning">已暂停</span>`;
  return `<span class="tag muted">已移除</span>`;
}

function renderAppointmentStatusPill(status) {
  if (status === "已完成") return `<span class="tag success">已完成</span>`;
  if (status === "待主管确认") return `<span class="tag warning">待主管确认</span>`;
  if (status === "KYC 进行中") return `<span class="tag pending">KYC进行中</span>`;
  return `<span class="tag muted">已拒绝</span>`;
}

function renderApiKeyStatusPill(status) {
  if (status === "有效") return `<span class="tag success">有效</span>`;
  return `<span class="tag muted">已吊销</span>`;
}

function getMemberEntity(entityId) {
  return getEntityById(entityId);
}

function toggleMemberStatus(entityId, memberId) {
  const entity = getMemberEntity(entityId);
  if (!entity) return;
  const member = entity.memberCenter.members.find((item) => item.id === memberId);
  if (!member || member.status === "已移除") return;
  const pause = member.status !== "已暂停";
  const reason = window.prompt(pause ? "请输入暂停原因" : "请输入恢复原因");
  if (!reason || !reason.trim()) return;
  const before = member.status;
  member.status = pause ? "已暂停" : "活跃";
  pushAuditLog(getSelectedMerchant().profileAuditLogs, pause ? "强制暂停成员" : "恢复成员", member.email, `${before} -> ${member.status}`);
  pageFlashMessage = pause ? "成员已强制暂停，已通知商户 Admin。" : "成员已恢复登录权限。";
  renderApp();
}

function submitNewAppointment(entityId) {
  const entity = getMemberEntity(entityId);
  if (!entity) return;
  if (!membersAppointeeName.trim() || !membersAppointeeEmail.trim() || !membersAppointmentLetterName.trim() || !membersAppointeeIdFileName.trim()) {
    pageFlashMessage = "请先填写所有必填字段。";
    renderApp();
    return;
  }
  const next = String(entity.memberCenter.appointmentRequests.length + 1).padStart(3, "0");
  const base = entity.id.replace(/[^\w]/g, "");
  const requestId = `ADM-${base}-${next}`;
  entity.memberCenter.appointmentRequests.unshift({
    id: requestId,
    submittedAt: new Date().toISOString(),
    status: "KYC 进行中",
    nomineeName: membersAppointeeName.trim(),
    nomineeEmail: membersAppointeeEmail.trim(),
    nomineeTitle: membersAppointeeTitle.trim(),
    companyLetterFile: membersAppointmentLetterName.trim(),
    idFile: membersAppointeeIdFileName.trim(),
    kycChecks: { identity: "通过", sanction: "通过", pep: "通过" },
    kycConclusion: "待确认",
    reviewedBy: "",
    confirmedBy: "",
    completedAt: "",
  });
  pushAuditLog(getSelectedMerchant().profileAuditLogs, "发起 Admin 任命工单", entity.id, requestId);
  membersNewAppointmentDrawerEntityId = "";
  membersAppointmentDetailEntityId = entityId;
  membersAppointmentDetailId = requestId;
  membersAppointeeName = "";
  membersAppointeeEmail = "";
  membersAppointeeTitle = "";
  membersAppointmentLetterName = "";
  membersAppointeeIdFileName = "";
  pageFlashMessage = "任命工单已创建，状态为 KYC 进行中。";
  renderApp();
}

function updateAppointmentCheck(entityId, appointmentId, checkKey, value) {
  const entity = getMemberEntity(entityId);
  if (!entity) return;
  const req = entity.memberCenter.appointmentRequests.find((item) => item.id === appointmentId);
  if (!req || !req.kycChecks || req.status === "已完成" || req.status === "已拒绝") return;
  req.kycChecks[checkKey] = value;
}

function submitAppointmentKyc(entityId, appointmentId, pass) {
  const entity = getMemberEntity(entityId);
  if (!entity) return;
  const req = entity.memberCenter.appointmentRequests.find((item) => item.id === appointmentId);
  if (!req || req.status !== "KYC 进行中") return;
  if (pass) {
    const allPass = Object.values(req.kycChecks || {}).every((item) => item === "通过");
    if (!allPass) {
      pageFlashMessage = "请先完成三项核验并确保全部通过。";
      renderApp();
      return;
    }
    req.status = "待主管确认";
    req.kycConclusion = "通过";
    req.reviewedBy = currentOps;
    pageFlashMessage = "KYC 已通过，请由 Ops 主管执行二次确认。";
  } else {
    const reason = window.prompt("请输入 KYC 未通过原因");
    if (!reason || !reason.trim()) return;
    req.status = "已拒绝";
    req.kycConclusion = "未通过";
    req.reviewedBy = currentOps;
    req.completedAt = new Date().toISOString();
    pageFlashMessage = "该任命工单已拒绝，系统将通知商户。";
  }
  pushAuditLog(getSelectedMerchant().profileAuditLogs, "处理 Admin 任命工单", req.id, req.status);
  renderApp();
}

function confirmAppointment(entityId, appointmentId) {
  const entity = getMemberEntity(entityId);
  if (!entity) return;
  const req = entity.memberCenter.appointmentRequests.find((item) => item.id === appointmentId);
  if (!req || req.status !== "待主管确认") return;
  if (!membersAppointmentSecondApprover) {
    pageFlashMessage = "请选择 Ops 主管确认人。";
    renderApp();
    return;
  }
  if (membersAppointmentSecondApprover === currentOps || membersAppointmentSecondApprover === req.reviewedBy) {
    pageFlashMessage = "双人审核要求：执行人与确认人不能为同一人。";
    renderApp();
    return;
  }
  req.status = "已完成";
  req.confirmedBy = membersAppointmentSecondApprover;
  req.completedAt = new Date().toISOString();
  const existing = entity.memberCenter.members.find((item) => item.email.toLowerCase() === req.nomineeEmail.toLowerCase());
  if (existing) {
    existing.role = "Admin";
    existing.status = "活跃";
    existing.kycStatus = "已验证";
    existing.kycVerifiedAt = formatDate(new Date().toISOString()).replace(/\//g, "-");
    existing.appointmentId = req.id;
  } else {
    entity.memberCenter.members.unshift({
      id: `MEM-${entity.id.replace(/[^\w]/g, "")}-${String(entity.memberCenter.members.length + 1).padStart(2, "0")}`,
      name: req.nomineeName,
      email: req.nomineeEmail,
      role: "Admin",
      status: "活跃",
      country: "香港",
      title: req.nomineeTitle || "授权代表",
      joinedAt: formatDate(new Date().toISOString()).replace(/\//g, "-"),
      lastLoginAt: "",
      kycStatus: "已验证",
      kycVerifiedAt: formatDate(new Date().toISOString()).replace(/\//g, "-"),
      appointmentId: req.id,
    });
  }
  pushAuditLog(getSelectedMerchant().profileAuditLogs, "完成 Admin 任命", req.id, req.nomineeEmail);
  membersAppointmentSecondApprover = "";
  pageFlashMessage = "Admin 任命完成，系统已发送激活邮件并写入合规档案。";
  renderApp();
}

function forceRevokeApiKey(entityId, keyId) {
  const entity = getMemberEntity(entityId);
  if (!entity) return;
  const key = entity.memberCenter.apiKeys.find((item) => item.id === keyId);
  if (!key || key.status === "已吊销") return;
  const reason = window.prompt("请输入吊销原因（必填）");
  if (!reason || !reason.trim()) return;
  if (!window.confirm("确认强制吊销？该操作不可恢复。")) return;
  key.status = "已吊销";
  pushAuditLog(getSelectedMerchant().profileAuditLogs, "强制吊销 API Key", key.name, reason.trim());
  pageFlashMessage = "API Key 已吊销并立即失效，已通知商户 Admin。";
  renderApp();
}

function ensureKybExpansionState(merchant) {
  if (kybExpandedForMerchantId !== merchant.id) {
    kybExpandedEntityIds.clear();
    merchant.legalEntities.forEach((entity) => {
      if (entity.kybStatus !== "active") {
        kybExpandedEntityIds.add(entity.id);
      }
      if (!kybSubTabByEntity[entity.id]) kybSubTabByEntity[entity.id] = "config";
    });
    kybExpandedForMerchantId = merchant.id;
  }
  if (kybFocusEntityId) {
    kybExpandedEntityIds.add(kybFocusEntityId);
  }
}

function renderKybConfigSubTab(merchant, entity) {
  const lockHint = entity.adminActivationStatus === "已激活" ? "（已激活后锁定）" : "";
  return `
    <div class="profile-grid">
      <div><span>目标牌照</span><strong>${escapeHtml(entity.licenseName)}</strong></div>
      <div><span>注册地</span><strong>${escapeHtml(merchant.jurisdiction)}</strong></div>
      <div><span>Admin 邮箱</span><strong>${escapeHtml(merchant.adminEmail)} ${lockHint}</strong></div>
      <div><span>Admin 激活状态</span><strong>${escapeHtml(entity.adminActivationStatus)}</strong></div>
      <div><span>产品权限范围（框架）</span><input data-kyb-config-scope data-entity-id="${escapeHtml(
        entity.id
      )}" class="filter-control" value="${escapeHtml(entity.productScope)}" /></div>
      <div><span>适用 Fee Plan</span><input data-kyb-config-fee data-entity-id="${escapeHtml(
        entity.id
      )}" class="filter-control" value="${escapeHtml(entity.feePlan)}" /></div>
    </div>
    ${
      canResendActivation(entity)
        ? `<div style="margin-top:10px;"><button data-resend-activation data-entity-id="${escapeHtml(entity.id)}" class="tab-btn">重新发送激活邮件</button></div>`
        : ""
    }
  `;
}

function renderKybMaterialsSubTab(merchant, entity) {
  const summary = getEntityMaterialsSummary(entity);
  const reviewMaterial = kybReviewEntityId === entity.id ? getMaterialById(entity, kybReviewMaterialId) : null;

  return `
    <div class="materials-head">
      <p>Document Vault 来源：<span class="mini-tag">共享</span> 来自 CustomerProfile；<span class="mini-tag">专属</span> 为本牌照材料。</p>
    </div>
    ${renderMaterialGroupTable(entity, "企业文件")}
    ${renderMaterialGroupTable(entity, "UBO 文件")}
    ${renderMaterialGroupTable(entity, "协议文件")}

    <div class="materials-summary">
      <p><strong>材料完整性：</strong>${summary.doneCount} / ${summary.total} 项已完成</p>
      <p><strong>待处理项：</strong>${summary.pendingItems.length ? escapeHtml(summary.pendingItems.join(" · ")) : "无"}</p>
    </div>

    ${
      reviewMaterial
        ? `
      <aside class="material-review-panel">
        <h5>文件审核</h5>
        ${renderMaterialPreview(reviewMaterial)}
        <p>文件类型：${escapeHtml(reviewMaterial.label)}</p>
        <p>上传时间：${formatExactTime(reviewMaterial.uploadedAt)}</p>
        <p>上传方：${escapeHtml(reviewMaterial.uploadedBy)}</p>
        <label>
          <span>审核意见（选填）</span>
          <textarea data-kyb-review-comment class="filter-control" rows="3">${escapeHtml(kybReviewComment)}</textarea>
        </label>
        <div class="section-actions">
          <button data-kyb-review-reject class="tab-btn">✗ 拒绝，要求重新上传</button>
          <button data-kyb-review-approve class="tab-btn active">✓ 审核通过</button>
        </div>
      </aside>
    `
        : ""
    }
  `;
}

function renderMaterialPreview(material) {
  const fileType = getMaterialFileType(material.attachmentPath || material.fileName);
  const source = escapeHtml(material.attachmentPath || "");
  const head = `
    <div class="material-preview-meta">
      <span class="mini-tag">${fileType}</span>
      <span>${escapeHtml(material.fileName)}</span>
    </div>
  `;

  if (fileType === "图片" || fileType === "SVG") {
    return `
      ${head}
      <div class="material-image-wrap">
        <img class="material-image" src="${source}" alt="${escapeHtml(material.fileName)}" />
      </div>
    `;
  }

  if (fileType === "PDF") {
    return `
      ${head}
      <iframe class="material-preview-frame" title="文件预览" src="${source}"></iframe>
    `;
  }

  return `
    ${head}
    <div class="material-preview-fallback">
      <p>当前文件类型不支持内嵌预览。</p>
      <a class="link-btn" href="${source}" target="_blank" rel="noopener noreferrer">在新标签页打开</a>
    </div>
  `;
}

function getMaterialFileType(fileNameOrPath) {
  const lower = String(fileNameOrPath || "").toLowerCase();
  if (lower.endsWith(".pdf")) return "PDF";
  if (lower.endsWith(".svg")) return "SVG";
  if (lower.endsWith(".png") || lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "图片";
  if (lower.endsWith(".doc") || lower.endsWith(".docx")) return "Word";
  return "文件";
}

function renderMaterialGroupTable(entity, groupName) {
  const groupRows = entity.materials.filter((item) => item.group === groupName);
  return `
    <div class="materials-group">
      <h6>${groupName}</h6>
      <div class="materials-table">
        ${groupRows
          .map((item) => {
            const canReview = item.status === "待审核" || item.status === "待重新上传";
            const actionLabel = canReview ? "审核" : "查看";
            return `
            <div class="materials-row">
              <span>${escapeHtml(item.personName ? `${item.personName} · ${item.label}` : item.label)}</span>
              <span>${escapeHtml(item.fileName)}</span>
              <span>${escapeHtml(item.source)}</span>
              <span>${escapeHtml(item.status)}</span>
              <button class="link-btn" data-material-review="${escapeHtml(item.id)}" data-entity-id="${escapeHtml(entity.id)}">${actionLabel}</button>
            </div>
          `;
          })
          .join("")}
      </div>
    </div>
  `;
}

function renderKybDecisionSubTab(entity) {
  const summary = getEntityMaterialsSummary(entity);
  const incomplete = summary.doneCount < summary.total;
  const pendingCount = summary.total - summary.doneCount;
  const sanctionHit = entity.systemChecks.sanction === "命中";
  const approvalRequest = entity.decisionDraft.approvalRequest;
  const canApprove = !incomplete && !sanctionHit;

  return `
    <section class="decision-panel">
      <h6>系统自动审核结果</h6>
      <div class="decision-grid">
        <p>制裁筛查：${escapeHtml(entity.systemChecks.sanction)}</p>
        <p>行业风险筛查：${escapeHtml(entity.systemChecks.industryRisk)}</p>
        <p>UBO PEP 筛查：${escapeHtml(entity.systemChecks.uboPep)}</p>
        <p>文件完整性：${summary.doneCount} / ${summary.total}</p>
      </div>
      <p><strong>系统建议：</strong>${escapeHtml(entity.systemChecks.suggestion)}</p>

      <label>
        <span>人工审核意见</span>
        <textarea data-kyb-decision-comment data-entity-id="${escapeHtml(entity.id)}" class="filter-control" rows="3">${escapeHtml(
          entity.decisionDraft.manualComment || ""
        )}</textarea>
      </label>

      <label>
        <span>初始风险评级</span>
        <select data-kyb-risk-rating data-entity-id="${escapeHtml(entity.id)}" class="filter-control">
          ${["低风险", "中风险", "高风险"]
            .map((risk) => `<option value="${risk}" ${entity.decisionDraft.riskRating === risk ? "selected" : ""}>${risk}</option>`)
            .join("")}
        </select>
      </label>

      <label>
        <span>拒绝原因（拒绝时必填）</span>
        <textarea data-kyb-reject-reason data-entity-id="${escapeHtml(entity.id)}" class="filter-control" rows="2">${escapeHtml(
          entity.decisionDraft.rejectReason || ""
        )}</textarea>
      </label>

      ${
        incomplete
          ? `<p class="drawer-error">还有 ${pendingCount} 项材料待审核</p>`
          : sanctionHit
            ? `<p class="drawer-error">制裁筛查命中：批准按钮强制禁用，仅可拒绝申请。</p>`
            : ""
      }

      <div class="section-actions">
        <button data-kyb-decision-reject data-entity-id="${escapeHtml(entity.id)}" class="tab-btn" ${incomplete ? "disabled" : ""}>✗ 拒绝申请</button>
        ${sanctionHit ? "" : `<button data-kyb-decision-approve data-entity-id="${escapeHtml(entity.id)}" class="tab-btn active" ${canApprove ? "" : "disabled"}>✓ 批准通过</button>`}
      </div>

      ${
        approvalRequest
          ? `
        <div class="inline-drawer">
          <p>已由 ${escapeHtml(approvalRequest.submittedBy)} 提交审批，请选择另一位 Ops 进行确认。</p>
          <label>
            <span>审批确认人</span>
            <select data-kyb-second-approver data-entity-id="${escapeHtml(entity.id)}" class="filter-control">
              <option value="">请选择</option>
              ${rmOptions
                .filter((name) => name !== approvalRequest.submittedBy)
                .map(
                  (name) =>
                    `<option value="${name}" ${entity.decisionDraft.secondApprover === name ? "selected" : ""}>${name}</option>`
                )
                .join("")}
            </select>
          </label>
          <button data-kyb-confirm-approval data-entity-id="${escapeHtml(entity.id)}" class="tab-btn active">完成审批确认</button>
        </div>
      `
          : ""
      }
    </section>
  `;
}

function renderKybHistorySubTab(entity) {
  const timeline = [...entity.history].sort((a, b) => new Date(b.at) - new Date(a.at));
  return `
    <section class="history-timeline">
      ${timeline
        .map(
          (item) => `
        <article class="timeline-item">
          <p>${formatExactTime(item.at)} · ${escapeHtml(item.actor)} → ${escapeHtml(item.action)}</p>
          ${item.detail ? `<strong>${escapeHtml(item.detail)}</strong>` : ""}
          <button class="link-btn" data-open-history-record data-entity-id="${escapeHtml(entity.id)}" data-history-at="${escapeHtml(
            item.at
          )}">查看完整记录</button>
        </article>
      `
        )
        .join("")}
    </section>
  `;
}

function renderHistoryModal(entity, record) {
  const changes = Array.isArray(record.changes) ? record.changes : [];
  const contextEntries = Object.entries(record.context || {}).filter(([, value]) => value !== null && value !== "");

  return `
    <div class="history-modal-mask" id="history-modal-mask"></div>
    <aside class="history-modal">
      <div class="drawer-head">
        <h3>审核记录详情</h3>
        <button class="tab-btn" id="close-history-modal">关闭</button>
      </div>
      <div class="history-detail-grid">
        <p><strong>牌照实体：</strong>${escapeHtml(entity.licenseName)} · ${escapeHtml(entity.id)}</p>
        <p><strong>时间：</strong>${formatExactTime(record.at)}</p>
        <p><strong>操作人：</strong>${escapeHtml(record.actor)}</p>
        <p><strong>动作：</strong>${escapeHtml(record.action)}</p>
        <p><strong>详情：</strong>${escapeHtml(record.detail || "无")}</p>
        ${
          changes.length
            ? `
          <div class="history-change-panel">
            <h4>关键字段变化</h4>
            <div class="history-change-list">
              ${changes
                .map(
                  (item) => `
                <div class="history-change-item">
                  <p>${escapeHtml(item.field || "字段")}</p>
                  <div class="history-change-flow">
                    <span class="history-before">${escapeHtml(String(item.before ?? "-"))}</span>
                    <span class="history-arrow">→</span>
                    <span class="history-after">${escapeHtml(String(item.after ?? "-"))}</span>
                  </div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        `
            : ""
        }
        ${
          contextEntries.length
            ? `
          <div class="history-context-row">
            ${contextEntries
              .map(
                ([key, value]) =>
                  `<span class="history-context-chip">${escapeHtml(key)}：${escapeHtml(String(value))}</span>`
              )
              .join("")}
          </div>
        `
            : ""
        }
      </div>
    </aside>
  `;
}

function renderGroupDetail(container) {
  const list = merchants.filter((merchant) => merchant.enterpriseGroup === selectedGroupName);
  container.innerHTML = `
    <article class="card">
      <h3>集团：${escapeHtml(selectedGroupName || "未选择")}</h3>
      <p>该集团下 CustomerProfile 列表</p>
      <div class="license-entity-table">
        ${
          list.length
            ? list
                .map(
                  (merchant) => `
                <div class="license-entity-row">
                  <span>${escapeHtml(merchant.name)}</span>
                  <span>${escapeHtml(merchant.customerProfileId)}</span>
                  <span>${escapeHtml(merchant.complianceStatus)}</span>
                  <button class="link-btn" data-open-merchant-detail="${escapeHtml(merchant.id)}">跳转商户 →</button>
                </div>
              `
                )
                .join("")
            : "<p>该集团暂无商户</p>"
        }
      </div>
    </article>
  `;
}

function mapAppointmentStatusForQueue(status) {
  if (status === "待主管确认") return "待确认";
  return status;
}

function isAppointmentInQueue(status) {
  return status !== "已完成" && status !== "已拒绝";
}

function getQueueUrgency(hours) {
  if (hours > 48) return "high";
  if (hours >= 24) return "medium";
  return "low";
}

function renderQueueUrgency(urgency) {
  if (urgency === "high") return `<span class="tag danger">高</span>`;
  if (urgency === "medium") return `<span class="tag warning">中</span>`;
  return `<span class="tag success">低</span>`;
}

function getAssigneeLabel(assignee) {
  if (!assignee) return `<span class="tag warning">未分配</span>`;
  return escapeHtml(assignee);
}

function touchAdminQueueTimestamp() {
  adminQueueLastUpdatedAt = new Date().toISOString();
}

function setupAdminQueueAutoRefresh() {
  if (adminQueueAutoRefreshInstalled) return;
  adminQueueAutoRefreshInstalled = true;
  setInterval(() => {
    touchAdminQueueTimestamp();
    if (activeRoute === "globalBoard") {
      renderApp();
    }
  }, 5 * 60 * 1000);
}

function normalizeAppointmentMeta(request) {
  if (!request.kycMeta) {
    request.kycMeta = {
      identity: { by: "", at: "" },
      sanction: { by: "系统自动", at: request.submittedAt || "" },
      pep: { by: "系统自动", at: request.submittedAt || "" },
    };
  }
  ["identity", "sanction", "pep"].forEach((key) => {
    if (!request.kycMeta[key]) request.kycMeta[key] = { by: "", at: "" };
  });
  if (!request.assignee) request.assignee = "";
  if (!request.nomineeRole) request.nomineeRole = "Admin";
  if (!request.kycComment) request.kycComment = "";
}

function getAdminQueueItems() {
  const rows = [];
  merchants.forEach((merchant) => {
    merchant.legalEntities.forEach((entity) => {
      entity.memberCenter.appointmentRequests.forEach((request) => {
        normalizeAppointmentMeta(request);
        const status = mapAppointmentStatusForQueue(request.status);
        if (!isAppointmentInQueue(status)) return;
        const waitHours = Math.max(0, Math.floor((Date.now() - new Date(request.submittedAt).getTime()) / (60 * 60 * 1000)));
        rows.push({
          key: `${merchant.id}::${entity.id}::${request.id}`,
          merchant,
          entity,
          request,
          status,
          waitHours,
          urgency: getQueueUrgency(waitHours),
        });
      });
    });
  });
  return rows;
}

function getFilteredAdminQueueItems() {
  let rows = getAdminQueueItems();
  if (adminQueueStatusTab !== "all") {
    rows = rows.filter((item) => item.status === adminQueueStatusTab);
  }
  if (adminQueueFilters.license !== "all") {
    rows = rows.filter((item) => item.entity.licenseName === adminQueueFilters.license);
  }
  if (adminQueueFilters.assignee === "mine") {
    rows = rows.filter((item) => item.request.assignee === currentOps);
  } else if (adminQueueFilters.assignee === "unassigned") {
    rows = rows.filter((item) => !item.request.assignee);
  } else if (adminQueueFilters.assignee !== "all") {
    rows = rows.filter((item) => item.request.assignee === adminQueueFilters.assignee);
  }

  if (adminQueueFilters.timePreset !== "all") {
    const now = new Date();
    let start = null;
    let end = null;
    if (adminQueueFilters.timePreset === "today") {
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
      end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    } else if (adminQueueFilters.timePreset === "3d") {
      start = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
      end = now;
    } else if (adminQueueFilters.timePreset === "7d") {
      start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      end = now;
    } else if (adminQueueFilters.timePreset === "custom") {
      if (adminQueueFilters.startDate) start = new Date(`${adminQueueFilters.startDate}T00:00:00`);
      if (adminQueueFilters.endDate) end = new Date(`${adminQueueFilters.endDate}T23:59:59`);
    }
    if (start) rows = rows.filter((item) => new Date(item.request.submittedAt) >= start);
    if (end) rows = rows.filter((item) => new Date(item.request.submittedAt) <= end);
  }

  rows.sort((a, b) => {
    const uDiff = urgencyRank(b.urgency) - urgencyRank(a.urgency);
    if (uDiff !== 0) return uDiff;
    return new Date(a.request.submittedAt) - new Date(b.request.submittedAt);
  });
  return rows;
}

function getAdminQueueStats(rows) {
  return {
    all: rows.length,
    pending: rows.filter((item) => item.status === "待处理").length,
    inProgress: rows.filter((item) => item.status === "KYC 进行中").length,
    waitingConfirm: rows.filter((item) => item.status === "待确认").length,
  };
}

function findAdminQueueItemByKey(key) {
  return getAdminQueueItems().find((item) => item.key === key) || null;
}

function renderAdminQueueDetailPanel(item) {
  if (!item) {
    return `<article class="card"><h3>工单详情</h3><p>从左侧列表选择一条工单，右侧展开处理面板。</p></article>`;
  }
  const { merchant, entity, request, status } = item;
  const canOperateAsSupervisor = supervisorOps.includes(currentOps) && request.reviewedBy !== currentOps;
  const allChecksDone = ["identity", "sanction", "pep"].every((key) => request.kycChecks[key] && request.kycChecks[key] !== "待核验");
  const hasFailedCheck = ["identity", "sanction", "pep"].some((key) => request.kycChecks[key] === "未通过");

  return `
    <article class="card adminq-panel">
      <h3>任命工单 ${escapeHtml(request.id)}</h3>
      <div class="decision-grid">
        <p>商户：${escapeHtml(merchant.name)} · ${escapeHtml(entity.licenseName)}</p>
        <p>提交时间：${escapeHtml(formatExactTime(request.submittedAt))}</p>
        <p>当前状态：${escapeHtml(status)}</p>
        <p>处理人：${escapeHtml(request.assignee || "未分配")}</p>
      </div>

      <div class="decision-grid">
        <p>姓名：${escapeHtml(request.nomineeName)}</p>
        <p>邮箱：${escapeHtml(request.nomineeEmail)}</p>
        <p>职位：${escapeHtml(request.nomineeTitle || "-")}</p>
        <p>提名角色：${escapeHtml(request.nomineeRole || "Admin")}</p>
      </div>

      <div class="decision-grid">
        <p>公司任命函：${escapeHtml(request.companyLetterFile)} <button class="link-btn">查看</button></p>
        <p>被提名人证件：${escapeHtml(request.idFile)} <button class="link-btn">查看</button></p>
      </div>

      <div class="decision-grid">
        <p>证件核验：${escapeHtml(request.kycChecks.identity || "待核验")} ${request.kycMeta.identity.at ? `${formatDate(request.kycMeta.identity.at)} ${escapeHtml(request.kycMeta.identity.by || "")}` : ""}</p>
        <p>制裁筛查：${escapeHtml(request.kycChecks.sanction || "待核验")} ${request.kycMeta.sanction.at ? `${formatDate(request.kycMeta.sanction.at)} ${escapeHtml(request.kycMeta.sanction.by || "")}` : ""}</p>
        <p>PEP 筛查：${escapeHtml(request.kycChecks.pep || "待核验")} ${request.kycMeta.pep.at ? `${formatDate(request.kycMeta.pep.at)} ${escapeHtml(request.kycMeta.pep.by || "")}` : ""}</p>
        <p>KYC 结论：${escapeHtml(request.kycConclusion || "待确认")} ${
          request.reviewedBy ? `${escapeHtml(request.reviewedBy)} · ${escapeHtml(formatDate(request.kycConclusionAt || request.submittedAt))}` : ""
        }</p>
      </div>

      <label>
        <span>核验意见</span>
        <textarea class="filter-control" rows="3" data-adminq-kyc-comment>${escapeHtml(adminQueueKycComment || request.kycComment || "")}</textarea>
      </label>

      ${
        status === "待处理"
          ? `
        <div class="section-actions">
          <button class="tab-btn active" data-adminq-start data-request-key="${escapeHtml(item.key)}">开始处理（分配给我）</button>
        </div>
      `
          : status === "KYC 进行中"
            ? `
        <div class="section-actions">
          <button class="tab-btn" data-adminq-check-reject data-request-key="${escapeHtml(item.key)}" data-check-key="identity">证件核验未通过</button>
          <button class="tab-btn active" data-adminq-check-pass data-request-key="${escapeHtml(item.key)}" data-check-key="identity">证件核验通过</button>
          <button class="tab-btn" data-adminq-check-reject data-request-key="${escapeHtml(item.key)}" data-check-key="sanction">制裁筛查未通过</button>
          <button class="tab-btn active" data-adminq-check-pass data-request-key="${escapeHtml(item.key)}" data-check-key="sanction">制裁筛查通过</button>
          <button class="tab-btn" data-adminq-check-reject data-request-key="${escapeHtml(item.key)}" data-check-key="pep">PEP筛查未通过</button>
          <button class="tab-btn active" data-adminq-check-pass data-request-key="${escapeHtml(item.key)}" data-check-key="pep">PEP筛查通过</button>
        </div>
        <div class="section-actions">
          <button class="tab-btn" data-adminq-kyc-reject data-request-key="${escapeHtml(item.key)}" ${allChecksDone ? "" : "disabled"}>✗ KYC 未通过</button>
          <button class="tab-btn active" data-adminq-kyc-pass data-request-key="${escapeHtml(item.key)}" ${
              allChecksDone && !hasFailedCheck ? "" : "disabled"
            }>✓ KYC 通过</button>
        </div>
      `
            : status === "待确认"
              ? `
        <p class="sort-hint">当前步骤：等待 Ops 主管最终确认任命</p>
        ${
          !canOperateAsSupervisor
            ? `<p class="drawer-error">请由其他 Ops 主管完成最终确认（双人审核防自审）。</p>`
            : ""
        }
        <div class="section-actions">
          <button class="tab-btn" data-adminq-final-reject data-request-key="${escapeHtml(item.key)}" ${
              canOperateAsSupervisor ? "" : "disabled"
            }>✗ 拒绝任命</button>
          <button class="tab-btn active" data-adminq-final-confirm data-request-key="${escapeHtml(item.key)}" ${
              canOperateAsSupervisor ? "" : "disabled"
            }>✓ 确认完成任命</button>
        </div>
      `
              : `<p class="sort-hint">工单已完结，仅支持查看。</p>`
      }
      <p class="sort-hint">⚠ 确认后系统将设置 Admin、发送激活邮件并写入合规档案。</p>
    </article>
  `;
}

function startAdminQueueRequest(key) {
  const item = findAdminQueueItemByKey(key);
  if (!item) return;
  item.request.assignee = currentOps;
  item.request.status = "KYC 进行中";
  if (!item.request.kycChecks.identity) item.request.kycChecks.identity = "待核验";
  touchAdminQueueTimestamp();
  pageFlashMessage = "工单已分配给你，状态更新为 KYC 进行中。";
  renderApp();
}

function updateAdminQueueCheck(key, checkKey, passed) {
  const item = findAdminQueueItemByKey(key);
  if (!item) return;
  if (mapAppointmentStatusForQueue(item.request.status) !== "KYC 进行中") return;
  item.request.kycChecks[checkKey] = passed ? "通过" : "未通过";
  item.request.kycMeta[checkKey] = { by: currentOps, at: new Date().toISOString() };
  touchAdminQueueTimestamp();
  renderApp();
}

function submitAdminQueueKycConclusion(key, passed) {
  const item = findAdminQueueItemByKey(key);
  if (!item) return;
  const comment = (adminQueueKycComment || "").trim();
  if (!comment) {
    pageFlashMessage = "请填写核验意见。";
    renderApp();
    return;
  }
  const allChecksDone = ["identity", "sanction", "pep"].every(
    (checkKey) => item.request.kycChecks[checkKey] && item.request.kycChecks[checkKey] !== "待核验"
  );
  if (!allChecksDone) {
    pageFlashMessage = "请先完成三项核验。";
    renderApp();
    return;
  }
  if (passed) {
    const hasFailed = ["identity", "sanction", "pep"].some((checkKey) => item.request.kycChecks[checkKey] === "未通过");
    if (hasFailed) {
      pageFlashMessage = "存在未通过项，不能提交 KYC 通过。";
      renderApp();
      return;
    }
    item.request.status = "待主管确认";
    item.request.kycConclusion = "已通过";
    item.request.reviewedBy = currentOps;
    item.request.kycComment = comment;
    item.request.kycConclusionAt = new Date().toISOString();
    pageFlashMessage = "KYC 已通过，工单进入待确认。";
  } else {
    item.request.status = "已拒绝";
    item.request.kycConclusion = "未通过";
    item.request.reviewedBy = currentOps;
    item.request.kycComment = comment;
    item.request.kycConclusionAt = new Date().toISOString();
    item.request.completedAt = new Date().toISOString();
    pageFlashMessage = "KYC 未通过，工单已拒绝。";
    adminQueueSelectedRequestKey = "";
  }
  touchAdminQueueTimestamp();
  renderApp();
}

function finalizeAdminAppointment(key, approved) {
  const item = findAdminQueueItemByKey(key);
  if (!item) return;
  if (mapAppointmentStatusForQueue(item.request.status) !== "待确认") return;
  if (!supervisorOps.includes(currentOps) || item.request.reviewedBy === currentOps) {
    pageFlashMessage = "双人审核限制：请由其他 Ops 主管确认。";
    renderApp();
    return;
  }
  if (!approved) {
    const reason = window.prompt("请输入拒绝原因");
    if (!reason || !reason.trim()) return;
    item.request.status = "已拒绝";
    item.request.confirmedBy = currentOps;
    item.request.kycComment = `${item.request.kycComment || ""}；主管拒绝原因：${reason.trim()}`;
    item.request.completedAt = new Date().toISOString();
    pageFlashMessage = "工单已拒绝并通知商户。";
    adminQueueSelectedRequestKey = "";
    touchAdminQueueTimestamp();
    renderApp();
    return;
  }
  item.request.status = "已完成";
  item.request.confirmedBy = currentOps;
  item.request.completedAt = new Date().toISOString();
  const existing = item.entity.memberCenter.members.find(
    (member) => member.email.toLowerCase() === item.request.nomineeEmail.toLowerCase()
  );
  if (existing) {
    existing.role = item.request.nomineeRole || "Admin";
    existing.status = "活跃";
    existing.kycStatus = "已验证";
    existing.kycVerifiedAt = formatDate(new Date().toISOString()).replace(/\//g, "-");
    existing.appointmentId = item.request.id;
  } else {
    item.entity.memberCenter.members.unshift({
      id: `MEM-${item.entity.id.replace(/[^\w]/g, "")}-${String(item.entity.memberCenter.members.length + 1).padStart(2, "0")}`,
      name: item.request.nomineeName,
      email: item.request.nomineeEmail,
      role: item.request.nomineeRole || "Admin",
      status: "活跃",
      country: "香港",
      title: item.request.nomineeTitle || "管理员",
      joinedAt: formatDate(new Date().toISOString()).replace(/\//g, "-"),
      lastLoginAt: "",
      kycStatus: "已验证",
      kycVerifiedAt: formatDate(new Date().toISOString()).replace(/\//g, "-"),
      appointmentId: item.request.id,
    });
  }
  adminQueueSelectedRequestKey = "";
  touchAdminQueueTimestamp();
  pageFlashMessage = "任命已确认完成，系统已发送激活邮件并写入合规档案。";
  renderApp();
}

function normalizeDocExpiryRangeByDays(daysLeft) {
  if (daysLeft < 0) return "expired";
  if (daysLeft <= 30) return "30d";
  if (daysLeft <= 60) return "31_60";
  if (daysLeft <= 90) return "61_90";
  return "other";
}

function docExpiryRangeLabel(range) {
  if (range === "expired") return "已过期";
  if (range === "30d") return "30天内";
  if (range === "31_60") return "31-60天";
  if (range === "61_90") return "61-90天";
  return "其他";
}

function renderDocExpiryStatusTag(range) {
  if (range === "expired") return `<span class="tag danger">已过期</span>`;
  if (range === "30d") return `<span class="tag warning">30天内</span>`;
  if (range === "31_60") return `<span class="tag pending">31-60天</span>`;
  return `<span class="tag success">61-90天</span>`;
}

function renderDocExpiryUrgencyTag(range) {
  if (range === "expired") return `<span class="tag danger">极高</span>`;
  if (range === "30d") return `<span class="tag warning">高</span>`;
  if (range === "31_60") return `<span class="tag pending">中</span>`;
  return `<span class="tag success">低</span>`;
}

function getDaysLeftUntil(expiryDate) {
  const end = new Date(`${expiryDate}T23:59:59`);
  if (Number.isNaN(end.getTime())) return null;
  const diff = end.getTime() - Date.now();
  return Math.ceil(diff / (24 * 60 * 60 * 1000));
}

function mapDocFileType(fileType) {
  if (String(fileType).includes("UBO护照")) return "UBO护照";
  if (String(fileType).includes("UBO地址证明")) return "UBO地址证明";
  if (String(fileType).includes("商业登记证")) return "商业登记证";
  if (String(fileType).includes("公司章程")) return "公司章程";
  return "其他";
}

function extractRelatedObject(fileType) {
  const parts = String(fileType || "").split("·");
  if (parts.length > 1 && (parts[0].includes("UBO护照") || parts[0].includes("UBO地址证明"))) {
    return parts.slice(1).join("·");
  }
  return "—";
}

function getDefaultNotifyTemplate(row) {
  const dateText = row.file.expiryDate;
  if (row.fileType === "UBO护照") {
    return `${row.relatedObject} 的护照将于 ${dateText} 到期，请登录 Merchant Portal 上传新版护照。`;
  }
  if (row.fileType === "UBO地址证明") {
    return `${row.relatedObject} 的地址证明将于 ${dateText} 到期，请登录 Merchant Portal 上传近 3 个月内的地址证明。`;
  }
  if (row.fileType === "商业登记证") {
    return `贵公司商业登记证将于 ${dateText} 到期，请登录 Merchant Portal 上传最新商业登记证。`;
  }
  return `${row.fileTypeDisplay} 将于 ${dateText} 到期，请尽快上传更新版本。`;
}

function setupDocExpiryMidnightRefresh() {
  if (docExpiryMidnightRefreshInstalled) return;
  docExpiryMidnightRefreshInstalled = true;
  const tick = () => {
    const now = new Date();
    const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 10);
    const wait = Math.max(5000, next.getTime() - now.getTime());
    setTimeout(() => {
      docExpiryLastUpdatedAt = new Date().toISOString();
      if (activeRoute === "globalBoard" && globalBoardView === "docExpiry") {
        renderApp();
      }
      tick();
    }, wait);
  };
  tick();
}

function getDocumentExpiryRows() {
  const rows = [];
  merchants.forEach((merchant) => {
    merchant.legalEntities.forEach((entity) => {
      (merchant.sharedComplianceFiles || []).forEach((file) => {
        if (!file.expiryDate || file.expiryDate === "长期") return;
        const daysLeft = getDaysLeftUntil(file.expiryDate);
        if (daysLeft === null) return;
        const range = normalizeDocExpiryRangeByDays(daysLeft);
        if (range === "other") return;
        rows.push({
          key: `${merchant.id}::${entity.id}::shared::${file.id}`,
          merchant,
          entity,
          file,
          level: "共享",
          fileType: mapDocFileType(file.fileType),
          fileTypeDisplay: file.fileType,
          relatedObject: extractRelatedObject(file.fileType),
          daysLeft,
          range,
        });
      });
      (entity.complianceFiles || []).forEach((file) => {
        if (!file.expiryDate || file.expiryDate === "长期") return;
        const daysLeft = getDaysLeftUntil(file.expiryDate);
        if (daysLeft === null) return;
        const range = normalizeDocExpiryRangeByDays(daysLeft);
        if (range === "other") return;
        rows.push({
          key: `${merchant.id}::${entity.id}::exclusive::${file.id}`,
          merchant,
          entity,
          file,
          level: "专属",
          fileType: mapDocFileType(file.fileType),
          fileTypeDisplay: file.fileType,
          relatedObject: extractRelatedObject(file.fileType),
          daysLeft,
          range,
        });
      });
    });
  });
  return rows;
}

function getDocumentExpiryStats(rows) {
  return {
    expired: rows.filter((row) => row.range === "expired").length,
    d30: rows.filter((row) => row.range === "30d").length,
    d31_60: rows.filter((row) => row.range === "31_60").length,
    d61_90: rows.filter((row) => row.range === "61_90").length,
  };
}

function getFilteredDocumentExpiryRows() {
  let rows = getDocumentExpiryRows();
  const effectiveRange = docExpiryCardFilter === "all" ? docExpiryFilters.range : docExpiryCardFilter;
  if (docExpiryFilters.fileType !== "all") {
    rows = rows.filter((row) => row.fileType === docExpiryFilters.fileType);
  }
  if (docExpiryFilters.license !== "all") {
    rows = rows.filter((row) => row.entity.licenseName === docExpiryFilters.license);
  }
  if (docExpiryFilters.level !== "all") {
    rows = rows.filter((row) => row.level === docExpiryFilters.level);
  }
  if (effectiveRange !== "all" && effectiveRange !== "custom") {
    rows = rows.filter((row) => row.range === effectiveRange);
  }
  if (docExpiryFilters.range === "custom") {
    if (docExpiryFilters.startDate) {
      const start = new Date(`${docExpiryFilters.startDate}T00:00:00`);
      rows = rows.filter((row) => new Date(`${row.file.expiryDate}T00:00:00`) >= start);
    }
    if (docExpiryFilters.endDate) {
      const end = new Date(`${docExpiryFilters.endDate}T23:59:59`);
      rows = rows.filter((row) => new Date(`${row.file.expiryDate}T00:00:00`) <= end);
    }
  }

  rows.sort((a, b) => {
    const score = { expired: 4, "30d": 3, "31_60": 2, "61_90": 1 };
    const uDiff = (score[b.range] || 0) - (score[a.range] || 0);
    if (uDiff !== 0) return uDiff;
    return new Date(`${a.file.expiryDate}T00:00:00`) - new Date(`${b.file.expiryDate}T00:00:00`);
  });
  return rows;
}

function findDocumentExpiryRowByKey(key) {
  return getDocumentExpiryRows().find((row) => row.key === key) || null;
}

function appendDocExpiryNote(key, content) {
  if (!docExpiryNotesByKey[key]) docExpiryNotesByKey[key] = [];
  docExpiryNotesByKey[key].unshift({
    at: new Date().toISOString(),
    actor: currentOps,
    content,
  });
}

function exportDocumentExpiryCsv(rows) {
  const header = [
    "商户名称",
    "CustomerProfile ID",
    "文件类型",
    "关联对象",
    "到期日期",
    "剩余天数",
    "状态",
    "牌照",
    "文件层级",
    "负责RM",
  ];
  const lines = [
    header.join(","),
    ...rows.map((row) =>
      [
        row.merchant.name,
        row.merchant.customerProfileId,
        row.fileTypeDisplay,
        row.relatedObject,
        row.file.expiryDate,
        row.daysLeft,
        docExpiryRangeLabel(row.range),
        row.entity.licenseName,
        row.level,
        row.merchant.rm || "",
      ]
        .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
        .join(",")
    ),
  ];
  const csv = lines.join("\n");
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = `document_expiry_board_${toDateInputValue(new Date())}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function renderDocumentExpiryDetailPanel(row) {
  if (!row) {
    return `<article class="card"><h3>处理面板</h3><p>请选择左侧一条证件记录进行处理。</p></article>`;
  }
  const notes = docExpiryNotesByKey[row.key] || [];
  const reviewReady = row.file.status === "待审核";
  const channelLabel =
    docExpiryNotifyChannel === "system"
      ? "系统通知"
      : docExpiryNotifyChannel === "email"
        ? "发送邮件"
        : "两者均发";
  return `
    <article class="card adminq-panel">
      <h3>${escapeHtml(row.fileTypeDisplay)} · ${escapeHtml(row.relatedObject)} · ${escapeHtml(row.merchant.name)}</h3>
      <div class="decision-grid">
        <p>文件类型：${escapeHtml(row.fileTypeDisplay)}</p>
        <p>关联对象：${escapeHtml(row.relatedObject)}</p>
        <p>所属商户：${escapeHtml(row.merchant.name)}</p>
        <p>牌照：${escapeHtml(row.entity.licenseName)}</p>
        <p>文件层级：${escapeHtml(row.level === "共享" ? "共享文件" : "专属文件")}</p>
        <p>当前版本：${escapeHtml(row.file.fileName)} <button class="link-btn">查看原件</button></p>
        <p>有效期：${escapeHtml(row.file.expiryDate)}（${row.daysLeft >= 0 ? `剩余 ${row.daysLeft} 天` : `已过期 ${Math.abs(row.daysLeft)} 天`}）</p>
        <p>当前状态：${renderDocExpiryStatusTag(row.range)}</p>
      </div>
      <div class="materials-group">
        <h6>Step 1 通知商户更新</h6>
        <label>
          <span>通知渠道</span>
          <select class="filter-control" data-docexp-notify-channel>
            <option value="system" ${docExpiryNotifyChannel === "system" ? "selected" : ""}>系统通知</option>
            <option value="email" ${docExpiryNotifyChannel === "email" ? "selected" : ""}>发送邮件</option>
            <option value="both" ${docExpiryNotifyChannel === "both" ? "selected" : ""}>两者均发</option>
          </select>
        </label>
        <label>
          <span>通知内容（可编辑）</span>
          <textarea class="filter-control" rows="3" data-docexp-notify-content>${escapeHtml(docExpiryNotifyContent || getDefaultNotifyTemplate(row))}</textarea>
        </label>
        <div class="section-actions">
          <button class="tab-btn active" data-docexp-send-notify data-row-key="${escapeHtml(row.key)}">发送通知</button>
          <span class="sort-hint">渠道：${escapeHtml(channelLabel)}</span>
        </div>
      </div>
      <div class="materials-group">
        <h6>Step 2 等待商户上传新文件</h6>
        <p class="sort-hint">商户上传后将出现在商户详情 · Tab 3 合规档案 · 文件管理中。</p>
      </div>
      <div class="materials-group">
        <h6>Step 3 审核新文件</h6>
        <p>当前状态：${reviewReady ? "商户已上传，可前往审核" : "等待商户上传"}</p>
        <button class="tab-btn ${reviewReady ? "active" : ""}" data-docexp-go-review data-row-key="${escapeHtml(row.key)}" ${
          reviewReady ? "" : "disabled"
        }>前往审核 →</button>
      </div>
      <div class="materials-group">
        <h6>内部备注</h6>
        <textarea class="filter-control" rows="2" data-docexp-note>${escapeHtml(docExpiryInternalNote)}</textarea>
        <div class="section-actions">
          <button class="tab-btn" data-docexp-add-note data-row-key="${escapeHtml(row.key)}">添加备注</button>
        </div>
        <div class="note-list">
          ${
            notes.length
              ? notes
                  .slice(0, 4)
                  .map(
                    (note) => `
                <article class="note-item">
                  <p>${escapeHtml(formatExactTime(note.at))} · ${escapeHtml(note.actor)}</p>
                  <strong>${escapeHtml(note.content)}</strong>
                </article>
              `
                  )
                  .join("")
              : "<p class='sort-hint'>暂无备注</p>"
          }
        </div>
      </div>
    </article>
  `;
}

function renderDocumentExpiryBoard() {
  const allRows = getDocumentExpiryRows();
  const stats = getDocumentExpiryStats(allRows);
  const filtered = getFilteredDocumentExpiryRows();
  const totalPages = Math.max(1, Math.ceil(filtered.length / docExpiryPageSize));
  if (docExpiryPage > totalPages) docExpiryPage = totalPages;
  const start = (docExpiryPage - 1) * docExpiryPageSize;
  const pageRows = filtered.slice(start, start + docExpiryPageSize);
  const customRange = docExpiryFilters.range === "custom";
  return `
    <section class="adminq-shell">
      <div class="adminq-head">
        <h3>全局看板 / 证件到期看板</h3>
        <div class="section-actions">
          <span class="sort-hint">最后更新时间：${escapeHtml(formatExactTime(docExpiryLastUpdatedAt))}</span>
          <button class="tab-btn" data-docexp-refresh>手动刷新</button>
        </div>
      </div>
      <div class="metric-grid adminq-metrics">
        <button class="metric-card adminq-expired ${docExpiryCardFilter === "expired" ? "active" : ""}" data-docexp-card="expired"><span class="metric-title">已过期</span><span class="metric-value">${stats.expired}</span></button>
        <button class="metric-card adminq-waiting ${docExpiryCardFilter === "30d" ? "active" : ""}" data-docexp-card="30d"><span class="metric-title">30天内</span><span class="metric-value">${stats.d30}</span></button>
        <button class="metric-card adminq-mid ${docExpiryCardFilter === "31_60" ? "active" : ""}" data-docexp-card="31_60"><span class="metric-title">31-60天</span><span class="metric-value">${stats.d31_60}</span></button>
        <button class="metric-card adminq-low ${docExpiryCardFilter === "61_90" ? "active" : ""}" data-docexp-card="61_90"><span class="metric-title">61-90天</span><span class="metric-value">${stats.d61_90}</span></button>
      </div>
      <div class="adminq-body">
        <article class="card">
          <div class="filter-row">
            <label class="filter-block"><span class="filter-label">文件类型</span>
              <select class="filter-control" data-docexp-filetype>
                ${["all", "UBO护照", "UBO地址证明", "商业登记证", "公司章程", "其他"]
                  .map((x) => `<option value="${x}" ${docExpiryFilters.fileType === x ? "selected" : ""}>${x === "all" ? "全部" : x}</option>`)
                  .join("")}
              </select>
            </label>
            <label class="filter-block"><span class="filter-label">牌照</span>
              <select class="filter-control" data-docexp-license>
                <option value="all" ${docExpiryFilters.license === "all" ? "selected" : ""}>全部</option>
                ${licenseOptions.map((item) => `<option value="${escapeHtml(item)}" ${docExpiryFilters.license === item ? "selected" : ""}>${escapeHtml(item)}</option>`).join("")}
              </select>
            </label>
            <label class="filter-block"><span class="filter-label">文件层级</span>
              <select class="filter-control" data-docexp-level>
                ${["all", "共享", "专属"].map((x) => `<option value="${x}" ${docExpiryFilters.level === x ? "selected" : ""}>${x === "all" ? "全部" : x}</option>`).join("")}
              </select>
            </label>
            <label class="filter-block"><span class="filter-label">到期时间范围</span>
              <select class="filter-control" data-docexp-range>
                <option value="all" ${docExpiryFilters.range === "all" ? "selected" : ""}>全部</option>
                <option value="expired" ${docExpiryFilters.range === "expired" ? "selected" : ""}>已过期</option>
                <option value="30d" ${docExpiryFilters.range === "30d" ? "selected" : ""}>30天内</option>
                <option value="31_60" ${docExpiryFilters.range === "31_60" ? "selected" : ""}>31-60天</option>
                <option value="61_90" ${docExpiryFilters.range === "61_90" ? "selected" : ""}>61-90天</option>
                <option value="custom" ${docExpiryFilters.range === "custom" ? "selected" : ""}>自定义范围</option>
              </select>
            </label>
          </div>
          <div class="merchant-date-row ${customRange ? "" : "disabled"}">
            <input class="filter-control" type="date" data-docexp-start value="${escapeHtml(docExpiryFilters.startDate)}" ${customRange ? "" : "disabled"} />
            <span>至</span>
            <input class="filter-control" type="date" data-docexp-end value="${escapeHtml(docExpiryFilters.endDate)}" ${customRange ? "" : "disabled"} />
            <button class="tab-btn" data-docexp-clear-range>清除</button>
          </div>

          <div class="table-wrap" style="margin-top:12px;">
            <table class="merchant-table adminq-table">
              <thead><tr><th>商户名称</th><th>文件类型</th><th>到期日期</th><th>剩余天数</th><th>状态</th><th>操作</th></tr></thead>
              <tbody>
                ${
                  pageRows.length
                    ? pageRows
                        .map(
                          (row) => `
                    <tr class="${row.range === "expired" ? "adminq-expired-row" : ""}">
                      <td>
                        <div class="table-cell-main">
                          <button class="link-btn" data-docexp-open-merchant="${escapeHtml(row.key)}">${escapeHtml(row.merchant.name)}</button>
                        </div>
                        <div class="table-cell-sub">
                          <span>${escapeHtml(row.relatedObject)}</span>
                          <span class="table-sub-sep">·</span>
                          <span class="mini-tag">${escapeHtml(`${row.entity.licenseName} · ${row.level}`)}</span>
                        </div>
                      </td>
                      <td>
                        <div class="table-cell-main">${escapeHtml(row.fileTypeDisplay)}</div>
                        <div class="table-cell-sub">
                          <span>RM：${escapeHtml(row.merchant.rm || "-")}</span>
                          <span class="table-sub-sep">·</span>
                          <span>${renderDocExpiryUrgencyTag(row.range)}</span>
                        </div>
                      </td>
                      <td><div class="table-cell-main">${escapeHtml(row.file.expiryDate)}</div></td>
                      <td><div class="table-cell-main ${row.daysLeft < 0 ? "adminq-days-negative" : ""}">${row.daysLeft}天</div></td>
                      <td><div class="table-cell-main">${renderDocExpiryStatusTag(row.range)}</div></td>
                      <td><button class="tab-btn active" data-docexp-open-merchant="${escapeHtml(row.key)}">处理</button></td>
                    </tr>
                  `
                        )
                        .join("")
                    : `<tr><td colspan="6">暂无匹配记录</td></tr>`
                }
              </tbody>
            </table>
          </div>
          <div class="adminq-pagination">
            <button class="tab-btn" data-docexp-export>导出 CSV</button>
            <button class="tab-btn" data-docexp-page="${Math.max(1, docExpiryPage - 1)}" ${docExpiryPage === 1 ? "disabled" : ""}>上一页</button>
            <span>${docExpiryPage} / ${totalPages}</span>
            <button class="tab-btn" data-docexp-page="${Math.min(totalPages, docExpiryPage + 1)}" ${docExpiryPage === totalPages ? "disabled" : ""}>下一页</button>
          </div>
        </article>
      </div>
    </section>
  `;
}

function renderAdminAppointmentQueueBoard() {
  const allRows = getAdminQueueItems();
  const stats = getAdminQueueStats(allRows);
  const filtered = getFilteredAdminQueueItems();
  const totalPages = Math.max(1, Math.ceil(filtered.length / adminQueuePageSize));
  if (adminQueuePage > totalPages) adminQueuePage = totalPages;
  const startIdx = (adminQueuePage - 1) * adminQueuePageSize;
  const pageRows = filtered.slice(startIdx, startIdx + adminQueuePageSize);
  const assignees = [...new Set(getAdminQueueItems().map((item) => item.request.assignee).filter(Boolean))];
  const customRange = adminQueueFilters.timePreset === "custom";

  return `
    <section class="adminq-shell">
      <div class="adminq-head">
        <h3>全局看板 / Admin 任命队列</h3>
        <div class="section-actions">
          <span class="sort-hint">最后更新时间：${escapeHtml(formatExactTime(adminQueueLastUpdatedAt))}</span>
          <button class="tab-btn" data-adminq-refresh>手动刷新</button>
        </div>
      </div>

      <div class="metric-grid adminq-metrics">
        <button class="metric-card ${adminQueueStatusTab === "all" ? "active" : ""}" data-adminq-card="all"><span class="metric-title">全部</span><span class="metric-value">${stats.all}</span></button>
        <button class="metric-card ${adminQueueStatusTab === "待处理" ? "active" : ""}" data-adminq-card="待处理"><span class="metric-title">待处理</span><span class="metric-value">${stats.pending}</span></button>
        <button class="metric-card ${adminQueueStatusTab === "KYC 进行中" ? "active" : ""}" data-adminq-card="KYC 进行中"><span class="metric-title">KYC进行中</span><span class="metric-value">${stats.inProgress}</span></button>
        <button class="metric-card adminq-waiting ${adminQueueStatusTab === "待确认" ? "active" : ""}" data-adminq-card="待确认"><span class="metric-title">待确认</span><span class="metric-value">${stats.waitingConfirm}</span></button>
      </div>

      <div class="adminq-body">
        <article class="card">
          <div class="filter-row">
            <label class="filter-block">
              <span class="filter-label">牌照</span>
              <select class="filter-control" data-adminq-filter-license>
                <option value="all" ${adminQueueFilters.license === "all" ? "selected" : ""}>全部</option>
                ${licenseOptions.map((item) => `<option value="${escapeHtml(item)}" ${adminQueueFilters.license === item ? "selected" : ""}>${escapeHtml(item)}</option>`).join("")}
              </select>
            </label>
            <label class="filter-block">
              <span class="filter-label">提交时间</span>
              <select class="filter-control" data-adminq-filter-time>
                <option value="all" ${adminQueueFilters.timePreset === "all" ? "selected" : ""}>全部</option>
                <option value="today" ${adminQueueFilters.timePreset === "today" ? "selected" : ""}>今天</option>
                <option value="3d" ${adminQueueFilters.timePreset === "3d" ? "selected" : ""}>近 3 天</option>
                <option value="7d" ${adminQueueFilters.timePreset === "7d" ? "selected" : ""}>近 7 天</option>
                <option value="custom" ${adminQueueFilters.timePreset === "custom" ? "selected" : ""}>自定义范围</option>
              </select>
            </label>
            <label class="filter-block">
              <span class="filter-label">处理人</span>
              <select class="filter-control" data-adminq-filter-assignee>
                <option value="all" ${adminQueueFilters.assignee === "all" ? "selected" : ""}>全部</option>
                <option value="mine" ${adminQueueFilters.assignee === "mine" ? "selected" : ""}>我的</option>
                <option value="unassigned" ${adminQueueFilters.assignee === "unassigned" ? "selected" : ""}>未分配</option>
                ${assignees.map((name) => `<option value="${escapeHtml(name)}" ${adminQueueFilters.assignee === name ? "selected" : ""}>${escapeHtml(name)}</option>`).join("")}
              </select>
            </label>
          </div>
          <div class="merchant-date-row ${customRange ? "" : "disabled"}">
            <input class="filter-control" type="date" data-adminq-start-date value="${escapeHtml(adminQueueFilters.startDate)}" ${customRange ? "" : "disabled"} />
            <span>至</span>
            <input class="filter-control" type="date" data-adminq-end-date value="${escapeHtml(adminQueueFilters.endDate)}" ${customRange ? "" : "disabled"} />
            <button class="tab-btn" data-adminq-clear-dates>清除时间</button>
          </div>

          <div class="table-wrap" style="margin-top:12px;">
            <table class="merchant-table adminq-table">
              <thead>
                <tr>
                  <th>商户名称</th><th>被提名人</th><th>提交时间</th><th>等待时长</th><th>状态</th><th>操作</th>
                </tr>
              </thead>
              <tbody>
                ${
                  pageRows.length
                    ? pageRows
                        .map(
                          (row) => `
                    <tr>
                      <td>
                        <div class="table-cell-main">
                          <button class="link-btn" data-open-merchant-members="${escapeHtml(row.key)}">${escapeHtml(row.merchant.name)}</button>
                        </div>
                        <div class="table-cell-sub">
                          <span>${getAssigneeLabel(row.request.assignee)}</span>
                          <span class="table-sub-sep">·</span>
                          <span class="mini-tag">${escapeHtml(row.entity.licenseName)}</span>
                        </div>
                      </td>
                      <td>
                        <div class="table-cell-main">${escapeHtml(row.request.nomineeName)}</div>
                        <div class="table-cell-sub">
                          <span class="mini-tag">${escapeHtml(row.request.nomineeRole || "Admin")}</span>
                          <span class="table-sub-sep">·</span>
                          <span>${renderQueueUrgency(row.urgency)}</span>
                        </div>
                      </td>
                      <td>
                        <div class="table-cell-main" title="${escapeHtml(formatExactTime(row.request.submittedAt))}">${escapeHtml(formatRelativeTime(row.request.submittedAt))}</div>
                        <div class="table-cell-sub">${escapeHtml(formatDate(row.request.submittedAt))}</div>
                      </td>
                      <td><div class="table-cell-main">${escapeHtml(String(row.waitHours))}小时</div></td>
                      <td><div class="table-cell-main">${renderAppointmentStatusPill(row.status)}</div></td>
                      <td><button class="tab-btn active" data-open-merchant-members="${escapeHtml(row.key)}">处理</button></td>
                    </tr>
                  `
                        )
                        .join("")
                    : `<tr><td colspan="6">暂无匹配工单</td></tr>`
                }
              </tbody>
            </table>
          </div>

          <div class="adminq-pagination">
            <button class="tab-btn" data-adminq-page="${Math.max(1, adminQueuePage - 1)}" ${adminQueuePage === 1 ? "disabled" : ""}>上一页</button>
            <span>${adminQueuePage} / ${totalPages}</span>
            <button class="tab-btn" data-adminq-page="${Math.min(totalPages, adminQueuePage + 1)}" ${adminQueuePage === totalPages ? "disabled" : ""}>下一页</button>
          </div>
        </article>
      </div>
    </section>
  `;
}

function renderGlobalBoard(container) {
  container.innerHTML = `
    <section class="card">
      <div class="tabs tabs-strong">
        <button class="tab-btn ${globalBoardView === "adminQueue" ? "active" : ""}" data-globalboard-view="adminQueue">Admin 任命队列</button>
        <button class="tab-btn ${globalBoardView === "docExpiry" ? "active" : ""}" data-globalboard-view="docExpiry">证件到期看板</button>
      </div>
      <div style="margin-top:10px;">
        ${globalBoardView === "adminQueue" ? renderAdminAppointmentQueueBoard() : renderDocumentExpiryBoard()}
      </div>
    </section>
  `;
}

window.addEventListener("hashchange", renderApp);
window.addEventListener("DOMContentLoaded", () => {
  installRealtimeComplianceListener();
  setupAdminQueueAutoRefresh();
  setupDocExpiryMidnightRefresh();
  renderApp();
});
