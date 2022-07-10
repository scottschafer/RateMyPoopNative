
export type PoopSchema = {
  id?: string;
  user?: string | number;
  timestamp: number;
  message?: string;
  latlng: {
    lat: number;
    lng: number;
  }
  rating: {
    size: number;
    consistency: number;
  }
}