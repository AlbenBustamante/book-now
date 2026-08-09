import { ServiceModel } from '@core/models/service.model';

export interface ServiceDetailModel {
  service: ServiceModel;
  avgRate: number;
  reviews: {
    userName: string;
    rate: number;
    comment: string;
    createdAt: Date;
  }[];
}
