import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { ProfilePageNames } from "./types";
import ProfilePageIndex from "./sub-pages";
import { Button } from "@/components/ui/button";

const ProfilePage = () => {

    const { user } = useAuth();

    const [page, setPage] = useState<ProfilePageNames>('index');

    if (!user) return <Card className="w-[80vw] md:w-[60vw] lg:w-[50vw] mx-auto mt-[20vh]">
        <CardHeader className="text-center">
            <CardTitle>Loading Data</CardTitle>
            <Loader2 className="animate-spin mx-auto" size={48} />
        </CardHeader>
    </Card>;

    switch (page) {
        case "index":
            return <ProfilePageIndex user={user} setPage={setPage} />;
        case "settings":
            return <div className="text-center mt-[40vh]">
                Settings
                <Button onClick={() => {setPage('index')}}>
                    Back
                </Button>
            </div>;
    }
}

export default ProfilePage;