import type React from 'react';
import type { ServiceItem } from '../../types';
import { ServiceIcon } from '../icons/ServiceIcon';

interface ServiceCardProps {
  readonly service: ServiceItem;
  readonly index: number;
}

export function ServiceCard({ service }: ServiceCardProps): React.JSX.Element {
  const style = { '--card-color': service.color } as React.CSSProperties;

  return (
    <div className="service-card" style={style}>
      <div className="service-card__icon">
        <ServiceIcon name={service.icon} />
      </div>
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__description">{service.description}</p>
      <ul className="service-card__features">
        {service.features.map((feature) => (
          <li key={feature} className="service-card__feature">
            <span className="service-card__check">&#10003;</span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
