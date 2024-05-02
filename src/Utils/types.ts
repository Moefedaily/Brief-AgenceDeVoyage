

export type authProps = {
    name?: string
    email: string
    password: string
}

export type Trip = {
    id: number
    title: string
    description: string
    image: string
    price: number
  }
  
  export type TripCardProps = {
    trip: Trip
  }
  
  export type ButtonProps = {
    title: string;
    bgColor: string;
    color: string;
    functionToPlay: () => void;
    disabled?: boolean;
  };
  

  export type SectionProps = {
    title: string;
    trips: Trip[];
  };

  export type CarouselProps = {
    children: React.ReactNode;
  };

  export  type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPrevClick: () => void;
    onNextClick: () => void;
  };
  

  