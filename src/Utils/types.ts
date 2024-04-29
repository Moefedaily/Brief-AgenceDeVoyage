
export type Trip = {
    id: number
    title: string
    description: string
    image: string
  }
  
  export type TripCardProps = {
    trip: Trip
  }
  
  export type ButtonProps = {
    title: string
    bgColor: string
    color: string
    functionToPlay: any
  }

  export type SectionProps = {
    title: string;
    trips: Trip[];
  };