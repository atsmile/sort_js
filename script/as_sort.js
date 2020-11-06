/*
※ ソート
ボタンとリスト(ul)に データ属性を設定することによりソート機能を適用

・ボタンの設定 (クラスがあっていればタグは問わない)
<li class="sort_btn" data-type="index" data-order="asc">元に戻す</li>
data-type : ソートしたい項目 => index
data-order : ソートの順序 => asc (昇順) / desc (降順) | 未設定:昇順
data-target : 同一ページ内に複数設置したい時、ソートしたいリスト(ul)のクラス | 未設定:"js-sort-main"

・リスト (ul li) MEMO 後々タグ自由化予定
data-targetで設定したクラスか、sort_mainをulに設定したリスト
data-typeで設定したデータ要素("index"の場合data-index)の値でソートする
*/
document.addEventListener(
  'DOMContentLoaded',
  function() {
    document.querySelectorAll('.js-sort-btn').forEach(e => {
      e.addEventListener('click', () => {
        // data-target の設定で複数設置可能
        const target = e.getAttribute('data-target') || 'js-sort-main'
        const tmp_parent = document.getElementsByClassName(target)
        const dom_parent = tmp_parent[0]
        const sort_type = 'data-' + e.getAttribute('data-type')
        const children = dom_parent.children

        // 該当する data の番号をキーに連想配列にしてから配列に格納
        var arr_sort_item = new Array()
        for (const li_item of Array.from(children)) {
          dom_parent.removeChild(li_item) // 削除
          var dom_data = {
            key: parseInt(li_item.getAttribute(sort_type), 10),
            value: li_item,
          }
          var data = Array()
          const li_attr = li_item.attributes
          for (const data_name of Array.from(li_attr)) {
            data[data_name.name] = data_name.value
          }
          dom_data['data'] = data
          arr_sort_item.push(dom_data)
        }

        // ソート
        func_sort(arr_sort_item, e.dataset.order)

        // ソートされた配列を親要素にアペンド
        arr_sort_item.forEach(elem => {
          var new_elem = document.createElement('li')
          elem_data = elem.data // data 属性をすべて格納
          Object.keys(elem_data).forEach(type => {
            new_elem.setAttribute([type], elem_data[type])
          })
          new_elem.innerHTML = elem.value.innerHTML
          dom_parent.appendChild(new_elem)
        })
      })
    })
  },
  false
)
// ソート デフォルトで昇順
function func_sort(arr, args_order) {
  const order = args_order || "asc";
  arr.sort(function (a, b) {
    if (order == "asc") {
      // 昇順
      if (a.key < b.key) return -1;
      if (a.key > b.key) return 1;
      return 0;
    } else {
      // 降順
      if (order == "desc") {
        if (a.key > b.key) return -1;
        if (a.key < b.key) return 1;
      }
      return 0;
    }
  });
}
