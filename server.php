<?php

// echo '<pre>' . var_export($_POST, true) . '</pre>';

$post = array_slice($_POST, 0);

# Helpers
$rows_num = (int)$post['rows'];
unset($post['rows']);
$separator = $post['separator'];
unset($post['separator']);

# Some custom data
$hidden_input_names = json_decode($post['hidden_input_names']);
unset($post['hidden_input_names']);
for ($i=0; $i < count($hidden_input_names); $i++) {
	unset($post[$hidden_input_names[$i]]);
}

$row_length = count($post) / $rows_num;

$categories = array_map(function ($item) use ($separator) {
	return explode($separator, $item)[0];
}, array_keys(array_slice($post, 0, $row_length)));

foreach ($post as $key => $value) {
	if ((string)((float)($value)) != (string)$value) {
		$post[$key] = '\'' . $value . '\'';
	}
}

$values = [];
for ($i=0; $i < $rows_num; $i++) {
	$values []= '(' . implode(',', array_slice($post, $i*$row_length, $row_length)) . ')';
	if ($values[$i] === '(' . implode(',', array_fill(0, $row_length, '\'\'')) . ')') {
		unset($values[$i]);
	}
}
if (count($values) === 0) {throw new Exception('there is no data', 1);
}

$query = 'INSERT into mytable (' . implode(',', $categories) . ') values ' . implode(', ', $values) . ';';
echo $query . "<br>";