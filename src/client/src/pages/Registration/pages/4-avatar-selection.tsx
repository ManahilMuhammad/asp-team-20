import { Button } from "@/components/ui/button";
import { RegistrationSubPageProps } from "../types";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const RegistrationAvatarSelection: React.FC<RegistrationSubPageProps> = ({ nextPage }) => {
    return <div className="text-center space-y-6">
        <p
            className="text-nutrifit-tertiary"
        >
            Let's<br />
            <span className="font-bold text-xl">
                choose an avatar
            </span>
        </p>

        <Carousel className="w-full max-w-xs">
            <CarouselContent>
                {Array.from({ length: 14 }).map((_, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <img
                                src={`./base-avatars/avatar-${index + 1}.svg`}
                                alt={`Avatar n° ${index + 1}`}
                                className="mx-auto rounded-full mb-2"
                            />
                            <span>Avatar {index + 1}</span>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
        
        <Button
            onClick={nextPage}
            className="text-nutrifit-tertiary text-lg font-normal bg-transparent hover:bg-transparent hover:underline mt-6"
        >
            Continue
        </Button>
    </div>
};

export default RegistrationAvatarSelection;