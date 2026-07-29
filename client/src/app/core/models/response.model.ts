/**
 * Base model for common responses.
 */
export interface ResponseModel {
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
