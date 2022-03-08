import React from 'react';
import TextWriter from '../../Shared/Components/TextWriter/text-writer';

const Home = () => {
    const text = 'The research about <code>react-transition-group</code> say that there is no clean working solution for animated routing with <code>react-router@6</code> at the moment. So instead, I decided to develop a tool that display text char by char, as if someone were typing it ! :D';

    return (
        <div className="home-component">
            <TextWriter text={text} speed={50} />
        </div>
    )
}

export default Home;