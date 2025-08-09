import React from 'react';
import PropTypes from 'prop-types';

const Answers = ({ ans }) => {
  if (!ans) return null;

  if (/^\d+\.\s/.test(ans)) {
    return (
      <li className="mb-2 list-decimal list-inside">
        {ans.replace(/^\d+\.\s/, '')}
      </li>
    );
  }

  return <p className="mb-3 leading-relaxed">{ans}</p>;
};

Answers.propTypes = {
  ans: PropTypes.string.isRequired
};

export default Answers;