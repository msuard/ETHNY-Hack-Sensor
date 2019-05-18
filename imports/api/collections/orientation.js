import { Mongo } from 'meteor/mongo';

export const Orientation = new Mongo.Collection('orientation');

Orientation.schema = new SimpleSchema({
  shippingId: {type: String},
  timestamp: {type: Object},
  orientation: {type: Object}
});

