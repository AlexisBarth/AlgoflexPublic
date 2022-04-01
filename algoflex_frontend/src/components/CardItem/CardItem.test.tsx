import React from 'react';
import CardItem from './CardItem';
import { render } from "@testing-library/react";

test.todo("Make CardItem tests");

const testingProps = {
    uid: 1,
    name: "Test",
    description: "TestDesc",
    imageUrl: "TestUrl",
    exerciseCount: 1,
    finishedExerciseCount: 1,
    favoriteStatus: true
}

it("Renders correctly", () => {
    const view = render(<CardItem />);
    expect(view).toMatchSnapshot();
});

describe('CardItem', () => {
    it('should work !', () => {
        render(<CardItem/>);
    });
});

