export const ORDER_STATUS_PERSENTAGE = {
  pending: 25,
  pendingWithDelivery: 35,
  accepted: 50,
  acceptedWithDelivery: 70,
  delivering: 75,
  completed: 100,
  canceled: 100,
  user_canceled: 100
};

export const ORDER_STATUS_AR = {
  pending: "معلّق",
  accepted: "تم الموافقة",
  delivering: "جاري الشحن",
  completed: "تم الاكتمال",
  canceled: "ملغى",
  user_canceled: "ملغى بواسطة المستخدم"
};

export const ORDER_STATUS_EN = {
  pending: "pending",
  accepted: "accepted",
  delivering: "in delivery",
  completed: "completed",
  canceled: "canceled",
  user_canceled: "user canceled"
};

export const TRANSACTIONS_STATUS = [
  "charge",
  "app_service_percentage",
  "app_project_percentage",
  "project_accept",
  "refund_project",
  "project_complete",
  "service_order_finish",
  "service_order_create",
  "refund_service_order",
  "withdraw_balance_complete",
  "withdraw_balance_request",
  "withdraw_balance_canceled"
];

export function formattedDate(date) {
  let formattedDate = new Date(date);
  formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(formattedDate);

  return formattedDate;
}

export const MONTHS = [
  {
    en: "January",
    ar: "يناير"
  },
  {
    en: "February",
    ar: "فبراير"
  },
  {
    en: "March",
    ar: "مارس"
  },
  {
    en: "April",
    ar: "أبريل"
  },
  {
    en: "May",
    ar: "مايو"
  },
  {
    en: "June",
    ar: "يونيو"
  },
  {
    en: "July",
    ar: "يوليو"
  },
  {
    en: "August",
    ar: "أغسطس"
  },
  {
    en: "September",
    ar: "سبتمبر"
  },
  {
    en: "October",
    ar: "أكتوبر"
  },
  {
    en: "November",
    ar: "نوفمبر"
  },
  {
    en: "December",
    ar: "ديسمبر"
  }
];
