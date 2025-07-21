import { Role } from "@/types/admin/sidebar";
import { MonetaryAwardType, PricingProps } from "@/types/admin/vrp-launchpad";
import { useTranslations } from "next-intl";
import { getMessages } from "next-intl/server";

export const useVrpInformations = () => {
  const t = useTranslations("VRPLaunchpad.phase");
  return {
    vrp_details: [
      {
        label: t("vrp_details.brief"),
        value: 1,
      },
      {
        label: t("vrp_details.details"),
        value: 2,
      },
      {
        label: t("vrp_details.setup"),
        value: 3,
      },
      {
        label: t("vrp_details.initial_scope"),
        value: 4,
      },
      {
        label: t("vrp_details.notes"),
        value: 5,
      },
      {
        label: t("vrp_details.review"),
        value: 6,
      },
    ],
    setup_phase: [
      {
        label: t("setup.review_vrp"),
        value: 1,
      },
      {
        label: t("setup.make_changes"),
        value: 2,
      },
      {
        label: t("setup.notes"),
        value: 3,
      },
      {
        label: t("setup.review"),
        value: 4,
      },
    ],
    company_revision: [
      {
        label: t("company_revision.notes"),
        value: 1,
      },
      {
        label: t("company_revision.details"),
        value: 2,
      },
      {
        label: t("company_revision.monetary_awards"),
        value: 3,
      },
      {
        label: t("company_revision.initial_scope"),
        value: 4,
      },
      {
        label: t("company_revision.rules_policies"),
        value: 5,
      },
      {
        label: t("company_revision.notes"),
        value: 6,
      },
      {
        label: t("company_revision.review"),
        value: 7,
      },
    ],
    mediator_revision: [
      {
        label: t("mediator_revision.review_vrp"),
        value: 1,
      },
      {
        label: t("mediator_revision.setup_monetary_awards"),
        value: 2,
      },
      {
        label: t("mediator_revision.setup_initial_scope"),
        value: 3,
      },
      {
        label: t("mediator_revision.notes"),
        value: 4,
      },
      {
        label: t("mediator_revision.review"),
        value: 5,
      },
    ],
    publish: [
      {
        label: t("publish.publish"),
        value: 1,
      },
      {
        label: t("publish.details"),
        value: 2,
      },
      {
        label: t("publish.monetary_awards"),
        value: 3,
      },
      {
        label: t("publish.initial_scope"),
        value: 4,
      },
      {
        label: t("publish.rules_policies"),
        value: 5,
      },
      {
        label: t("publish.notes"),
        value: 6,
      },
      {
        label: t("publish.review"),
        value: 7,
      },
    ],
  };
};

export const vrpInformations = {
  vrp_details: [
    {
      label: "Brief",
      value: 1,
    },
    {
      label: "VRP Details",
      value: 2,
    },
    {
      label: "Setup Monetary Awards",
      value: 3,
    },
    {
      label: "Setup Initial Scope",
      value: 4,
    },
    {
      label: "Notes",
      value: 5,
    },
    {
      label: "Review",
      value: 6,
    },
  ],
  setup_phase: [
    {
      label: "Review VRP Details",
      value: 1,
    },
    {
      label: "Make Changes",
      value: 2,
    },
    {
      label: "Notes",
      value: 3,
    },
    {
      label: "Review",
      value: 4,
    },
  ],
  company_revision: [
    {
      label: "Notes",
      value: 1,
    },
    {
      label: "VRP Details",
      value: 2,
    },
    {
      label: "Monetary Awards",
      value: 3,
    },
    {
      label: "Scope",
      value: 4,
    },
    {
      label: "Rules & Policies",
      value: 5,
    },
    {
      label: "Notes",
      value: 6,
    },
    {
      label: "Review",
      value: 7,
    },
  ],
  mediator_revision: [
    {
      label: "Review VRP Details",
      value: 1,
    },
    {
      label: "Setup Monetary Awards",
      value: 2,
    },
    {
      label: "Setup Initial Scope",
      value: 3,
    },
    {
      label: "Notes",
      value: 4,
    },
    {
      label: "Review",
      value: 5,
    },
  ],
  publish: [
    {
      label: "Publish",
      value: 1,
    },
    {
      label: "VRP Details",
      value: 2,
    },
    {
      label: "Monetary Awards",
      value: 3,
    },
    {
      label: "Scope",
      value: 4,
    },
    {
      label: "Rules & Policies",
      value: 5,
    },
    {
      label: "Notes",
      value: 6,
    },
    {
      label: "Review",
      value: 7,
    },
  ],
};

export const monetarySData: PricingProps[] = [
  {
    tier: "Tier I",
    category: "S-Tier1",
    list: [
      {
        label: "Low",
        value: 100,
      },
      {
        label: "Medium",
        value: 200,
      },
      {
        label: "High",
        value: 300,
      },
      {
        label: "Critical",
        value: 400,
      },
    ],
  },
  {
    tier: "Tier II",
    category: "S-Tier2",
    list: [
      {
        label: "Low",
        value: 150,
      },
      {
        label: "Medium",
        value: 250,
      },
      {
        label: "High",
        value: 350,
      },
      {
        label: "Critical",
        value: 450,
      },
    ],
  },
  {
    tier: "Tier III",
    category: "S-Tier3",
    list: [
      {
        label: "Low",
        value: 200,
      },
      {
        label: "Medium",
        value: 300,
      },
      {
        label: "High",
        value: 400,
      },
      {
        label: "Critical",
        value: 500,
      },
    ],
  },
];

export const monetaryMData: PricingProps[] = [
  {
    tier: "Tier I",
    category: "M-Tier1",
    list: [
      {
        label: "Low",
        value: 200,
      },
      {
        label: "Medium",
        value: 300,
      },
      {
        label: "High",
        value: 400,
      },
      {
        label: "Critical",
        value: 500,
      },
    ],
  },
  {
    tier: "Tier II",
    category: "M-Tier2",
    list: [
      {
        label: "Low",
        value: 250,
      },
      {
        label: "Medium",
        value: 350,
      },
      {
        label: "High",
        value: 450,
      },
      {
        label: "Critical",
        value: 550,
      },
    ],
  },
  {
    tier: "Tier III",
    category: "M-Tier3",
    list: [
      {
        label: "Low",
        value: 300,
      },
      {
        label: "Medium",
        value: 400,
      },
      {
        label: "High",
        value: 500,
      },
      {
        label: "Critical",
        value: 600,
      },
    ],
  },
];

export const monetaryLData: PricingProps[] = [
  {
    tier: "Tier I",
    category: "L-Tier1",
    list: [
      {
        label: "Low",
        value: 300,
      },
      {
        label: "Medium",
        value: 400,
      },
      {
        label: "High",
        value: 500,
      },
      {
        label: "Critical",
        value: 600,
      },
    ],
  },
  {
    tier: "Tier II",
    category: "L-Tier2",
    list: [
      {
        label: "Low",
        value: 350,
      },
      {
        label: "Medium",
        value: 450,
      },
      {
        label: "High",
        value: 550,
      },
      {
        label: "Critical",
        value: 650,
      },
    ],
  },
  {
    tier: "Tier III",
    category: "L-Tier3",
    list: [
      {
        label: "Low",
        value: 400,
      },
      {
        label: "Medium",
        value: 500,
      },
      {
        label: "High",
        value: 600,
      },
      {
        label: "Critical",
        value: 700,
      },
    ],
  },
];

export const monetaryXLData: PricingProps[] = [
  {
    tier: "Tier I",
    category: "XL-Tier1",
    list: [
      {
        label: "Low",
        value: 400,
      },
      {
        label: "Medium",
        value: 500,
      },
      {
        label: "High",
        value: 600,
      },
      {
        label: "Critical",
        value: 700,
      },
    ],
  },
  {
    tier: "Tier II",
    category: "XL-Tier2",
    list: [
      {
        label: "Low",
        value: 450,
      },
      {
        label: "Medium",
        value: 550,
      },
      {
        label: "High",
        value: 650,
      },
      {
        label: "Critical",
        value: 750,
      },
    ],
  },
  {
    tier: "Tier III",
    category: "XL-Tier3",
    list: [
      {
        label: "Low",
        value: 500,
      },
      {
        label: "Medium",
        value: 600,
      },
      {
        label: "High",
        value: 700,
      },
      {
        label: "Critical",
        value: 800,
      },
    ],
  },
];

export const useGetMonetaryAwardData = () => {
  const t = useTranslations("VRPLaunchpad.phase.vrp_details.monetary_awards");

  const monetaryAwardData: MonetaryAwardType[] = [
    {
      title: `${t("category")} S`,
      category: "S",
      priceData: monetarySData,
      variant: "company",
    },
    {
      title: `${t("category")} M`,
      category: "M",
      priceData: monetaryMData,
      variant: "company",
    },
    {
      title: `${t("category")} L`,
      category: "L",
      priceData: monetaryLData,
      variant: "company",
    },
    {
      title: `${t("category")} XL`,
      category: "XL",
      priceData: monetaryXLData,
      variant: "company",
    },
  ];

  return monetaryAwardData;
};

export const monetaryAwardData: MonetaryAwardType[] = [
  {
    title: "Category S",
    category: "S",
    priceData: monetarySData,
    variant: "company",
  },
  {
    title: "Category M",
    category: "M",
    priceData: monetaryMData,
    variant: "company",
  },
  {
    title: "Category L",
    category: "L",
    priceData: monetaryLData,
    variant: "company",
  },
  {
    title: "Category XL",
    category: "XL",
    priceData: monetaryXLData,
    variant: "company",
  },
];
export const monetaryAwardMediatorData: MonetaryAwardType[] = [
  {
    title: "Category S",
    category: "S",
    priceData: monetarySData,
    variant: "company",
  },
  {
    title: "Category M",
    category: "M",
    priceData: monetaryMData,
    variant: "company",
  },
  {
    title: "Category L",
    category: "L",
    priceData: monetaryLData,
    variant: "company",
  },
  {
    title: "Category XL",
    category: "XL",
    priceData: monetaryXLData,
    variant: "company",
  },
];
