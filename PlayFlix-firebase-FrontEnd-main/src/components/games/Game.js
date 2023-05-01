import { useEffect, useState } from "react";

export const Game = ({id, title, img, description, rating, userRating, genre}) => {
return <section>
    <div>
    {title}
    </div>
    <div>
    {img}
    </div>
    <div>
    {description}
    </div>
    <div>
    {rating}
    </div>
    <div>
    {userRating}
    </div>
    <div>
    {genre}
    </div>
</section>
}