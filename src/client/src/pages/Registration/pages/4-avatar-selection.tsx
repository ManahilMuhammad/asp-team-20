import { Button } from "@/components/ui/button";
import { RegistrationSubPageProps } from "../types";
import { Carousel, type CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const RegistrationAvatarSelection: React.FC<RegistrationSubPageProps> = ({ nextPage, updateDetails }) => {

    // Credit to ShadCN documentation
    // https://ui.shadcn.com/docs/components/carousel
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState<number>(0);
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        if (!api) return;

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)
    
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api]);

    const handlePageChange = () => {
        nextPage();
        if (updateDetails) updateDetails({ avatar: `avatar-${current}.svg`});
    }

    return <div className="text-center space-y-6">
        <p
            className="text-nutrifit-tertiary"
        >
            Let's<br />
            <span className="font-bold text-xl">
                choose an avatar
            </span>
        </p>

        <Carousel setApi={setApi} className="w-full max-w-xs">
            <CarouselContent>
                {Array.from({ length: 14 }).map((_, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <img
                                src={`./base-avatars/avatar-${index + 1}.svg`}
                                alt={`Avatar n° ${index + 1}`}
                                className="mx-auto rounded-full mb-2"
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>

        <p
            className="text-nutrifit-tertiary"
        >
            Avatar {current}/{count}
        </p>
        
        <Button
            onClick={handlePageChange}
            className="text-nutrifit-tertiary text-lg font-normal bg-transparent hover:bg-transparent hover:underline mt-6"
        >
            Finish
        </Button>
    </div>
};

export default RegistrationAvatarSelection;