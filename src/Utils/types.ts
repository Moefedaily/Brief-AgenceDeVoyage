

export type authProps = {
    name?: string
    email: string
    password: string
}

export type HeroProps = {
    title?: string;
    subtitle?: string;
    image: string;
    fullHeight?: boolean;
    showSearchBar?: boolean
  };
  

export type Trip = {
    id: number
    title: string
    description: string
    image: string
    price: number
    startDate:string
    endDate:string
    destinations?: {
        id: number;
        name: string;
      }[];
  }
  
  export type categoryProps={
    id:number
    name:string

  }
  export type TripCardProps = {
    trip: Trip
  }
  
  export type ButtonProps = {
    title: string;
    bgColor: string;
    color: string;
    functionToPlay?: () => void;
    disabled?: boolean;
  };
  

  export type SectionProps = {
    sectionTitle?:string,
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
  
  export type SearchParams = {
    category: string;
    country: string;
    duration: number;
  };

  export type SearchResultsSectionProps = {
    title: string;
    trips: any[];
    tripsPerPage: number;
  };
  

  export type AboutSectionProps = {
    verticalImage1: string;
    verticalImage2: string;
    horizontalImage1: string;
    horizontalImage2: string;
    title: string;
    description: string;
    buttonLink:string;
  };

  export type ParallaxSectionProps = {
    image: string;
    title?: string;
  }
  export type ServiceCardProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
  };
  export type ContactData = {
    name: string;
    email: string;
    phone: string;
    message: string;
    trip: number ;
    user_: number | null;
  };
  
  export type ContactFormProps ={
    trips: Trip[];
  }
  
    
  