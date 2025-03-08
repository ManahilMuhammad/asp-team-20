import { User } from "@/components/auth/auth-context";

export interface RegistrationDetails extends User {
    goal: string;
    age: number;
    height: number;
    weight: number;
}

export interface RegistrationSubPageProps {
    nextPage: () => void;
    details?: RegistrationDetails;
    updateDetails?: (data: RegistrationDetails) => void;
}