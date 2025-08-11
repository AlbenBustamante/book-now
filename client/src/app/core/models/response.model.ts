/**
 * Base model for common responses.
 */
export interface Response {
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
