import { getDescriptor, parseDescriptor } from '@craftercms/content';
import { DescriptorResponse } from '@craftercms/models';
import { map } from 'rxjs';

export function getModel(path = '/site/website/index.xml') {
  return getDescriptor(path, { flatten: true }).pipe(
    map((descriptor: DescriptorResponse | DescriptorResponse[]) => parseDescriptor(descriptor))
  );
}
