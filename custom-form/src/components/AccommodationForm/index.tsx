import { FieldPath, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { AccommodationFormTab } from "./components/AccommodationFormTab";
import { OwnerFormTab } from "./components/OwnerFormTab";
import { useState } from "react";
import "@/index.css";
import { SummaryTab } from "./components/SummaryTab";
import {
  defaultValues as initialValues,
  formSchema,
} from "@/schemas/Accommodation";
import {
  AccommodationFormType,
  AccommodationFormValues,
  FormTab,
  nextSteps,
  previousSteps,
} from "@/models/AccommodationForm";
import { getAccommodationFormValues } from "@/utils/getAccomodationFormValues";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { motion, AnimatePresence } from "motion/react";

const tabTitles: Record<FormTab, string> = {
  [FormTab.ACCOMMODATION]: "Accommodation",
  [FormTab.OWNER]: "Owner",
  [FormTab.SUMMARY]: "Summary",
};

const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

const triggerNames: Partial<Record<FormTab, FieldPath<AccommodationFormType>>> =
  {
    [FormTab.ACCOMMODATION]: "accommodation",
    [FormTab.OWNER]: "owner",
  };

interface Props {
  defaultValues?: AccommodationFormType;
  onSubmit?: (values: AccommodationFormValues) => Promise<void>;
}

export const AccommodationForm = ({
  onSubmit: onSubmitProps,
  defaultValues = initialValues,
}: Props) => {
  const [currentTab, setCurrentTab] = useState(FormTab.ACCOMMODATION);

  const nextTab = nextSteps[currentTab];
  const previousTab = previousSteps[currentTab];

  const methods = useForm<AccommodationFormType>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onBlur",
  });

  async function onSubmit(values: AccommodationFormType) {
    const formValues = getAccommodationFormValues(values);
    console.log(formValues);
    onSubmitProps?.(formValues);
    const isSuccess = Math.random() < 0.5;
    if (isSuccess) {
      const message = "The accommodation has been successfully sent.";
      enqueueSnackbar(message, {
        variant: "success",
        anchorOrigin: { horizontal: "center", vertical: "top" },
      });
    } else {
      const message = "Uh oh! Something went wrong.";
      enqueueSnackbar(message, {
        variant: "error",
        anchorOrigin: { horizontal: "center", vertical: "top" },
      });
    }
    methods.reset();
    setCurrentTab(FormTab.ACCOMMODATION);
  }

  function getTabTitle(currentTab: FormTab) {
    return tabTitles?.[currentTab];
  }

  function getTriggerName(currentTab: FormTab) {
    return triggerNames?.[currentTab];
  }

  return (
    <FormProvider {...methods}>
      <SnackbarProvider />
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col h-full w-full max-w-[80ch] mb-8 space-y-8"
      >
        <h1 className="scroll-m-20 text-2xl font-bold text-start">
          {getTabTitle(currentTab)}
        </h1>
        <div className="w-full h-full overflow-auto">
          <AnimatePresence mode="wait">
            {currentTab === FormTab.ACCOMMODATION && (
              <motion.div
                key="accommodation"
                variants={fadeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full h-full"
              >
                <AccommodationFormTab />
              </motion.div>
            )}
            {currentTab === FormTab.OWNER && (
              <motion.div
                key="owner"
                variants={fadeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full h-full"
              >
                <OwnerFormTab />
              </motion.div>
            )}
            {currentTab === FormTab.SUMMARY && (
              <motion.div
                key="summary"
                variants={fadeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full h-full"
              >
                <SummaryTab />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div
          className={`mt-auto flex gap-2 flex-wrap ${
            currentTab === FormTab.ACCOMMODATION
              ? "justify-end"
              : "justify-between"
          }`}
        >
          {currentTab !== FormTab.ACCOMMODATION && (
            <Button
              type="button"
              className="rounded-full px-8"
              variant="outline"
              onClick={() => {
                setCurrentTab(previousTab);
              }}
            >
              Back
            </Button>
          )}
          {currentTab !== FormTab.SUMMARY && (
            <Button
              type="button"
              className="rounded-full px-8"
              onClick={async () => {
                const triggerName = getTriggerName(currentTab);
                const isValid = await methods.trigger(triggerName);
                if (isValid) setCurrentTab(nextTab);
              }}
            >
              Next
            </Button>
          )}
          {currentTab === FormTab.SUMMARY && (
            <Button type="submit" className="rounded-full px-8">
              Submit
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};
