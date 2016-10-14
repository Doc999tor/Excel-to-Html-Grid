<?php

echo '<pre>' . var_export($_POST, true) . '</pre>';

$post = array_slice($_POST, 0);

$rows_num = (int)$post['rows'];

unset($post['rows']);

$row_length = count($post) / $rows_num;

echo '<pre>' . var_export($row_length, true) . '</pre>';

$categories = array_map(function ($item) {
	return explode('-', $item)[0];
}, array_keys(array_slice($post, 0, $row_length)));

echo '<pre>' . var_export($categories, true) . '</pre>';

foreach ($post as $key => $value) {
	$post[$key] = '\'' . $value . '\'';
}

$values = [];
for ($i=0; $i < $rows_num; $i++) {
	$values []= '(' . implode(',', array_slice($post, $i*$row_length, $row_length)) . ')';
}

$query = 'INSERT into mytable (' . implode(',', $categories) . ') values ' . implode(', ', $values) . ';';

echo $query;