export const adminMenu = [
  {
    //hệ thống
    name: "User System",
    menus: [
      {
        name: "Admin",
        subMenus: [
          { name: "User manage", link: "/system/user-manage" },
          { name: "User manage Redux", link: "/system/user-redux" },
        ],
      },

      { name: "Doctor manage", link: "/system/doctor-manage" },

      { name: "Schedule manage", link: "/system/schedule-manage" },

      {
        name: "Appointment manage",
        link: "/system/appointment-manage",
      },
    ],
  },
  {
    //Quản lý phòng khám
    name: "Clinic",
    menus: [
      {
        name: "Clinic Management",
        link: "/system/clinic",
      },
    ],
  },
  {
    //Quản lý chuyen khoa
    name: "Specialty",
    menus: [
      {
        name: "Specialty Management",
        link: "/system/specialty",
      },
    ],
  },
  {
    //Quản lý cam nang
    name: "Handbook",
    menus: [
      {
        name: "Handbook Management",
        link: "/system/handbook",
      },
    ],
  },
];
export const doctorMenu = [
  {
    //hệ thống
    name: "System",
    menus: [
      { name: "Schedule manage", link: "/system/schedule-manage" },
      {
        name: "Appointment manage",
        link: "/system/appointment-manage",
      },
    ],
  },
];
