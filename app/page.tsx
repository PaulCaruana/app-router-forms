// inside page.tsx

import { RegistrationForm } from "@/app/RegistrationForm";
import { schema } from "./registrationSchema";
import { z } from "zod";

export default function Home() {
  const onFormAction = async (
    prevState: {
      message: string;
      user?: z.infer<typeof schema>;
      issues?: string[];
    },
    formData: FormData,
  ) => {
    "use server";

    const data = Object.fromEntries(formData);
    const parsed = schema.safeParse(data);

    if (parsed.success) {
      console.log("User registered");
      return { message: "User registered", user: parsed.data };
    } else {
      return {
        message: "Invalid data",
        issues: parsed.error.issues.map((issue) => issue.message),
      };
    }
  };

  return (
    <div className="mx-auto max-w-xl">
      <RegistrationForm onFormAction={onFormAction} />
    </div>
  );
}
