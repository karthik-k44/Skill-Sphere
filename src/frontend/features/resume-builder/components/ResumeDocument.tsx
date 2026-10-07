import { ResumeTemplateTypeEnum, type ResumeDataType, type ResumeOptionsType } from "../types";
import { ClassicTemplate } from "./templates/ClassicTemplate";
import { ModernTemplate } from "./templates/ModernTemplate";

/** Picks the react-pdf template for the chosen options. */
export const ResumeDocument = ({ data, options }: { data: ResumeDataType; options: ResumeOptionsType }) =>
  options.template === ResumeTemplateTypeEnum.MODERN ? (
    <ModernTemplate data={data} options={options} />
  ) : (
    <ClassicTemplate data={data} options={options} />
  );
