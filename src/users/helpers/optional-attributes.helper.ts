import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/mapped-types';

/**
 * [] --> All are Required        |:_:|
 *
 * [attr1, attr2, ..., attrN] ---> all are Required except [attr1, attr2, ..., attrN]
 */
export const optionalAttributes = <TClass, K extends keyof TClass>(
  classType: new () => TClass,
  attributes: K[],
) => {
  if (!attributes.length) return;

  const partialType = PartialType(classType);
  const omitType = OmitType(classType, attributes); // Required attributes
  const pickType = PickType(partialType, attributes); // Optional attributes
  return IntersectionType(omitType, pickType);
};
