import type React from 'react';
import type { TestimonialItem } from '../../types';

interface TestimonialCardProps {
  readonly testimonial: TestimonialItem;
  readonly featured?: boolean;
}

function StarRating({ rating }: { readonly rating: number }): React.JSX.Element {
  return (
    <div className="testimonial-card__stars">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`testimonial-card__star${i < rating ? '' : ' testimonial-card__star--empty'}`}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
}

export function TestimonialCard({ testimonial, featured = false }: TestimonialCardProps): React.JSX.Element {
  return (
    <div className={`testimonial-card${featured ? ' testimonial-card--featured' : ''}`}>
      <StarRating rating={testimonial.rating} />
      <p className="testimonial-card__text">&ldquo;{testimonial.text}&rdquo;</p>
      <div className="testimonial-card__author">
        <img
          className="testimonial-card__avatar"
          src={testimonial.avatar}
          alt={testimonial.name}
          loading="lazy"
        />
        <div>
          <p className="testimonial-card__name">{testimonial.name}</p>
          <p className="testimonial-card__role">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}
