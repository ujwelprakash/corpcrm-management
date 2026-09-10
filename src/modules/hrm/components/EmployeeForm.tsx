import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeSchema, type EmployeeFormData } from "../schema/employeeSchema";
import { useAddEmployee } from "../api/useAddEmployee";
import { useTranslation } from "react-i18next";

const BRANCHES = ["Head Office", "North Branch", "South Branch", "East Branch"];
const DEPARTMENTS = ["Engineering", "Design", "HR", "Finance", "Sales", "Marketing"];
const DESIGNATIONS = ["Junior", "Mid-Level", "Senior", "Lead", "Manager", "Director"];
const ROLES = ["Employee", "Team Lead", "Manager", "Admin", "Super Admin"];

const inputCls = (hasError?: boolean) =>
  [
    "w-full px-3 py-2 rounded-lg text-[13px] outline-none transition-all duration-150",
    "bg-[rgb(var(--color-bg-soft))] text-[rgb(var(--color-text))]",
    "placeholder:text-[rgb(var(--color-text-muted))]",
    hasError
      ? "border border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
      : "border border-[rgb(var(--color-border))] focus:border-[rgb(var(--accent))] focus:ring-2 focus:bg-[rgb(var(--color-surface))]",
  ].join(" ");

const labelCls = "block text-[11.5px] font-semibold mb-1 text-[rgb(var(--color-text-soft))]";
const errorCls = "mt-1 text-[11px] text-red-500 flex items-center gap-1";

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={labelCls}>
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className={errorCls}>
          <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10A8 8 0 112 10a8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl p-5"
      style={{
        background: `rgb(var(--color-surface))`,
        border: `1px solid rgb(var(--color-border-soft))`,
      }}
    >
      <h3
        className="text-[13px] font-semibold mb-4 pb-3"
        style={{
          color: `rgb(var(--color-text))`,
          borderBottom: `1px solid rgb(var(--color-border-soft))`,
        }}
      >
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

const EmployeeForm = () => {
  const { mutate, isPending } = useAddEmployee();
  const { t } = useTranslation(["employees", "common"]);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      gender: "male",
      dateOfBirth: new Date().toISOString().split("T")[0],
      companyJoiningDate: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = (data: EmployeeFormData) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        setFileName(null);
      },
    });
  };

  const { ref: fileRegRef, ...fileRest } = register("document");

  return (
    <div
      className="min-h-screen px-6 py-6"
      style={{ background: `rgb(var(--color-bg-soft))` }}
    >
      <div className="mb-5">
        <h1
          className="text-[18px] font-bold tracking-tight"
          style={{ color: `rgb(var(--color-text))` }}
        >
          {t("createEmployee")}
        </h1>
        <div
          className="flex items-center gap-1.5 mt-1 text-[12px]"
          style={{ color: `rgb(var(--color-text-muted))` }}
        >
          <span>{t("dashboard", { ns: "common" })}</span>
          <span>›</span>
          <span>{t("employees")}</span>
          <span>›</span>
          <span style={{ color: `rgb(var(--color-text-soft))` }}>{t("createEmployee")}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

          {/* LEFT — Personal + Document */}
          <div className="flex flex-col gap-4">
            <Section title={t("personalDetail")}>
              <div className="grid grid-cols-2 gap-3">
                <Field label={t("name")} required error={errors.name?.message}>
                  <input {...register("name")} placeholder="Enter employee Name" className={inputCls(!!errors.name)} />
                </Field>
                <Field label={t("phone")} required error={errors.phone?.message}>
                  <input {...register("phone")} placeholder="Enter employee phone" className={inputCls(!!errors.phone)} />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field label={t("dateOfBirth")} required error={errors.dateOfBirth?.message}>
                  <input {...register("dateOfBirth")} type="date" className={inputCls(!!errors.dateOfBirth)} />
                </Field>
                <Field label={t("gender")} required error={errors.gender?.message}>
                  <div className="flex items-center gap-4 pt-2">
                    {(["male", "female"] as const).map((g) => (
                      <label key={g} className="flex items-center gap-1.5 text-[13px] cursor-pointer" style={{ color: `rgb(var(--color-text))` }}>
                        <input {...register("gender")} type="radio" value={g} className="w-3.5 h-3.5" />
                        {t(g)}
                      </label>
                    ))}
                  </div>
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field label={t("email")} required error={errors.email?.message}>
                  <input {...register("email")} type="email" placeholder="Enter email address" className={inputCls(!!errors.email)} />
                </Field>
                <Field label={t("password")} required error={errors.password?.message}>
                  <input {...register("password")} type="password" placeholder="••••••••" className={inputCls(!!errors.password)} />
                </Field>
              </div>

              <Field label={t("address")} required error={errors.address?.message}>
                <textarea {...register("address")} rows={3} placeholder="Enter employee address" className={inputCls(!!errors.address) + " resize-none"} />
              </Field>
            </Section>

            <Section title={t("document")}>
              <Field label={t("uploadDocument")} error={errors.document?.message as string}>
                <div
                  className="relative rounded-lg border-2 border-dashed transition-all cursor-pointer"
                  style={{ borderColor: `rgb(var(--color-border))`, background: `rgb(var(--color-bg-soft))` }}
                  onClick={() => fileRef.current?.click()}
                >
                  <div className="flex flex-col items-center justify-center py-8 gap-2">
                    <svg className="w-8 h-8" style={{ color: `rgb(var(--color-text-muted))` }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {fileName ? (
                      <p className="text-[12px] font-medium" style={{ color: `rgb(var(--accent))` }}>{fileName}</p>
                    ) : (
                      <>
                        <p className="text-[12px] font-medium" style={{ color: `rgb(var(--color-text-soft))` }}>{t("clickToUpload")}</p>
                        <p className="text-[11px]" style={{ color: `rgb(var(--color-text-muted))` }}>{t("fileTypes")}</p>
                      </>
                    )}
                  </div>
                  <input
                    {...fileRest}
                    ref={(e) => {
                      fileRegRef(e);
                      (fileRef as React.MutableRefObject<HTMLInputElement | null>).current = e;
                    }}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="sr-only"
                    onChange={(e) => {
                      fileRest.onChange(e);
                      setFileName(e.target.files?.[0]?.name ?? null);
                    }}
                  />
                </div>
              </Field>
            </Section>
          </div>

          {/* RIGHT — Company + Bank */}
          <div className="flex flex-col gap-4">
            <Section title={t("companyDetail")}>
              <Field label={t("employeeId")} error={errors.employeeId?.message}>
                <input {...register("employeeId")} placeholder="Enter employee code" className={inputCls(!!errors.employeeId)} />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label={t("branch")} required error={errors.branch?.message}>
                  <select {...register("branch")} className={inputCls(!!errors.branch)}>
                    <option value="">{t("selectBranch")}</option>
                    {BRANCHES.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </Field>
                <Field label={t("department")} required error={errors.department?.message}>
                  <select {...register("department")} className={inputCls(!!errors.department)}>
                    <option value="">{t("selectDepartment")}</option>
                    {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field label={t("designation")} required error={errors.designation?.message}>
                  <select {...register("designation")} className={inputCls(!!errors.designation)}>
                    <option value="">{t("selectDesignation")}</option>
                    {DESIGNATIONS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </Field>
                <Field label={t("role")} required error={errors.role?.message}>
                  <select {...register("role")} className={inputCls(!!errors.role)}>
                    <option value="">{t("selectRole")}</option>
                    {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </Field>
              </div>

              <Field label={t("joiningDate")} error={errors.companyJoiningDate?.message}>
                <input {...register("companyJoiningDate")} type="date" className={inputCls(!!errors.companyJoiningDate)} />
              </Field>
            </Section>

            <Section title={t("bankAccountDetail")}>
              <div className="grid grid-cols-2 gap-3">
                <Field label={t("accountHolderName")} error={errors.accountHolderName?.message}>
                  <input {...register("accountHolderName")} placeholder="Enter Account Holder Name" className={inputCls(!!errors.accountHolderName)} />
                </Field>
                <Field label={t("accountNumber")} error={errors.accountNumber?.message}>
                  <input {...register("accountNumber")} placeholder="Enter Account Number" className={inputCls(!!errors.accountNumber)} />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field label={t("bankName")} error={errors.bankName?.message}>
                  <input {...register("bankName")} placeholder="Enter Bank Name" className={inputCls(!!errors.bankName)} />
                </Field>
                <Field label={t("bankIdentifierCode")} error={errors.bankIdentifierCode?.message}>
                  <input {...register("bankIdentifierCode")} placeholder="Enter Bank Identifier Code" className={inputCls(!!errors.bankIdentifierCode)} />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field label={t("branchLocation")} error={errors.branchLocation?.message}>
                  <input {...register("branchLocation")} placeholder="Enter Branch Location" className={inputCls(!!errors.branchLocation)} />
                </Field>
                <Field label={t("taxPayerId")} error={errors.taxPayerId?.message}>
                  <input {...register("taxPayerId")} placeholder="Enter Tax Payer Id" className={inputCls(!!errors.taxPayerId)} />
                </Field>
              </div>
            </Section>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-end gap-3 mt-4 pt-4"
          style={{ borderTop: `1px solid rgb(var(--color-border-soft))` }}
        >
          <button
            type="button"
            onClick={() => { reset(); setFileName(null); }}
            className="px-5 py-2 rounded-lg text-[13px] font-medium transition-all"
            style={{ color: `rgb(var(--color-text-soft))`, border: `1px solid rgb(var(--color-border))`, background: "transparent" }}
          >
            {t("cancel", { ns: "common" })}
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-2 rounded-lg text-[13px] font-semibold text-white transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ background: `rgb(var(--accent))` }}
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                {t("creating", { ns: "common" })}
              </span>
            ) : t("create", { ns: "common" })}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;