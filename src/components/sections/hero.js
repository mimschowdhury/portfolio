import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  border-radius: 25px;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  .hero-content {
  margin: 0 auto;
  background-color: var(--hero-bg-color); 
  padding: 50px 100px;
  border-radius: 25px;
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color:rgb(204, 190, 225);
    line-height: 0.9;
    // text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  h2 {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
    
    &:hover {
    background-color: var(--white);
    color: var(--dark-navy);
    }
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsMounted(true); 
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Mimta Chowdhury.</h2>;
  const three = <h3 className="big-heading">I build things for the web.</h3>;
  const four = (
    <>
      <p>
        I’m a software engineer passionate about developing innovative and user-focused digital
        experiences. Currently, I’m building accessible, data-driven solutions and curating
        exceptional cafe discoveries at{' '}
        <a href="https://www.6ixcafes.com" target="_blank" rel="noreferrer">
          6ixCafes
        </a>
        .
      </p>
    </>
  );
  const five = (
    <a
      className="email-link"
      href="https://www.6ixcafes.com"
      target="_blank"
      rel="noreferrer">
      Check out my website!
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection style={!isMounted ? { visibility: 'hidden' } : {}}>
      <div className="hero-content">
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
      </div>
    </StyledHeroSection>
  );
};

export default Hero;
